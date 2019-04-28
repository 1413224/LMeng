<template>
	<div class="feedback-add">
		<div class="nub-top">
			<h2>新增反馈信息</h2>
		</div>
		<div class="add-cont">
			<div class="add-card" style="max-width: 750px; margin: 0 auto; padding-right: 100px;">
				<el-form :model="info" ref="info" label-width="160px">
					<el-form-item label="原因名称:" prop="name" >
						<el-select v-model="info.name" placeholder="请选择" style="width: 100%;">
							<el-option v-for="item in nameOptions" :key="item.causeId" :value="item.name" :label="item.name"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-if="info.name == '其他'" label="原因名称:" prop="tempName" >
						<el-input v-model="info.tempName" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="反馈内容">
					    <el-input type="textarea" v-model="info.content"></el-input>
					</el-form-item>
					<el-form-item label="图册：">
                    <div class="flex-start">
                        <el-upload
                            list-type="picture-card"
                            action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
                            :before-upload="beforeUpload"
                            :http-request="imgRequestArr"
                            :on-remove="onRemove"
                            :file-list="thumb">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                    </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addFeedback()">保存</el-button>
						<router-link to="/feedback">
							<el-button>返回列表</el-button>
						</router-link>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			info: {
				name: '',
				accountName: '',
				content: '',
				thumb: ''
			},
			nameOptions: [{
				causeId: 0,
				name: '其他'
			}],
			imageVisible: false,
            thumb: [],
		}
	},
	methods: {
		addFeedback () {
			let vm = this
			let name = vm.info.name == '其他' ? vm.info.tempName : vm.info.name
			let thumb = vm.thumb.map(obj => {
				return obj.name 
			})
			thumb = thumb.join(',')
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				name: name,
				content: vm.info.content,
				thumb: thumb
			}
			vm.$post(vm.$api.feedback.addFeedback, param).then(resp => {
//				vm.item = resp.lists
                this.$message({
					type: 'success',
					message: '保存成功!'
				})
			    this.$router.push('/feedback')
			})
		},
		imgRequestArr (obj) { // 图册上传
            let vm = this
            let temp = {
                file: obj.file,
                type: 'common',
                name: 'more-upload'
            }
            this.$post(vm.$api.share.upImage, temp).then(resp => {
                let item = {
                    name: resp.fileId,
                    url: resp.fileUrl
                }
                vm.thumb.push(item)
            }).catch(err => {
                vm.thumb = JSON.parse(JSON.stringify(vm.thumb)) // 上传失败时清除本地的图片缓存
            })
        },
        onRemove (file, fileList) {
            let vm = this
            let name = file.name
            for (let i in vm.thumb) {
                if (vm.thumb[i].name === name) {
                    vm.thumb.splice(i, 1)
                    return
                }
            }
        },
        beforeUpload (file) { // 基于elementUi图片上传拦截过滤器
            const isIMG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif')
            const isLt10M = file.size / 1024 / 1024 < 10
            if (!isIMG) {
                this.$message.error('上传图片只能jpg、jpeg、gif、png')
            }
            if (!isLt10M) {
                this.$message.error('上传图片不能大小超过10M！')
            }
            return isIMG && isLt10M
        },
        getCauseList () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				keyword: '',
				curPage: 1,
				pageSize: 1000
            }
            vm.$get(vm.$api.feedback.getCauseList, param).then(resp => {
                vm.nameOptions = resp.list
                vm.nameOptions.push({
					causeId: 0,
					name: '其他'
				})
            })
        },
	},
	created(){
		this.getCauseList()
	}
}
</script>

<style lang="less">
.feedback-add {
	.add-cont {
		margin: 20px;
		padding: 20px;
		background: #fff;
	}
    .el-upload--picture-card {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        line-height: 100px;
        vertical-align: top;
    }
    .el-upload-list--picture-card .el-upload-list__item {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        margin: 0 8px 8px 0;
        display: inline-block;
    }
}
</style>