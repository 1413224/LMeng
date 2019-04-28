<template>
	<div class="edit_notice">
        <div class="nub-top">
			<h2>{{toggleName}}</h2>
		</div>
        <el-card class="box-card">
            <el-form :model="info" :rules="rules" ref="info" label-width="100px">
                <el-form-item label="通知人 :" prop="mobile">
                    <el-input v-model="info.mobile" placeholder="请输入通知人手机号" class="input-w"></el-input>
                    <el-button type="primary" @click="onSearch(info.mobile)" class="btn-margin">检测</el-button>
                    <span class="assist"><i class="el-icon-info"></i> 请输入通知人手机号，并点击检测是否有通知人</span>
                </el-form-item>
                <el-form-item  prop="noticeUserId">
                    <div v-if="manage">
                        <img v-if="manage.logo && manage.logo.original" :src="manage.logo.original" alt="" class="img-user">
                        <span class="name-user">{{ manage.nickname }}</span>
                    </div>
                </el-form-item>
                <el-form-item label="通知类型 :">
                    <el-radio-group v-model="info.type">
                        <el-radio :label="1">全部通知</el-radio>
                        <el-radio :label="0">部分通知</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="通知间隔 :" v-if="info.type">
	                <el-select v-model="info.spaceTime" placeholder="请选择" class="input-w">
					    <el-option
					      v-for="(item,index) in selectionTime"
					      :key="index"
					      :label="item.name"
					      :value="item.spaceTime">
					    </el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="通知模板 :" v-if="!info.type">
	                <!-- <el-select v-model="info.privilegeCodes" multiple placeholder="请选择" class="input-w">
					    <el-option
					      v-for="item in codeOptions"
					      :key="item.code"
					      :label="item.name"
					      :value="item.code">
					    </el-option>
					</el-select> -->
                    <div class="notice-template" v-for="item in codeOptions" :key="item.code">
                        <el-checkbox :label="item.name" v-model="item.checked"></el-checkbox>
                        <el-select v-model="item.spaceTime" placeholder="请选择" style="margin-left:20px;">
					        <el-option
					          v-for="(item,index) in selectionTime"
					          :key="index"
					          :label="item.name"
					          :value="item.spaceTime">
					        </el-option>
					    </el-select>
                    </div>
				</el-form-item>
                <el-form-item label="状态 :">
                    <el-radio-group v-model="info.status">
                        <el-radio :label="1">有效</el-radio>
                        <el-radio :label="0">无效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>    
</template>

<script>
import {validatePhone} from '@/assets/js/elValidate.js'

export default {
    data () {
        return {
            info: {
                noticeUserId: '',
                status: 1,
                type: 1,
                mobile: '',
                spaceTime: ''
            },
	        rules: {
                noticeUserId: [{ required: true, message: '请先检测通知人', trigger: 'blur' }],
                mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
            },
            codeOptions: [],
            spaceTimeOptions: [],
            manage: '',
            nid: '',
            toggleName:'',
            selectionTime:[{
                name:'无间隔',
                spaceTime: 0
            },{
                name:'5分钟',
                spaceTime: 300
            },{
                name:'10分钟',
                spaceTime: 600
            },{
                name:'30分钟',
                spaceTime: 1800
            },{
                name:'1小时',
                spaceTime: 3600
            },{
                name:'6小时',
                spaceTime: 21600
            },{
                name:'1天',
                spaceTime: 86400
            },{
                name:'7天',
                spaceTime: 604800
            },{
                name:'15天',
                spaceTime: 1296000
            },{
                name:'30天',
                spaceTime: 2592000
            }],
            privilegeCodes:[]
        }
    },
    methods: {
    	onSearch (mobile) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                mobile: mobile
            }
            vm.$get(vm.$api.notice.getUserBasicInfoByMobile, param).then(resp => {
                vm.info.noticeUserId = resp.userId
                vm.manage = resp
                vm.$refs['info'].validate()
            }).catch(err => {
                vm.info.noticeUserId = ''
                vm.manage = ''
            })
        },
        getTemplateList () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                curPage: 1,
                pageSize: 1000
            }
            vm.$get(vm.$api.notice.getTemplateList, param).then(resp => {
                vm.codeOptions = resp.list
            })
        },
        onSubmit () {
            let vm = this
            vm.$refs['info'].validate((valid) => {
                if (valid) {
                    if(vm.info.type==0){
                        let tips = true
                        let param = Object.assign({}, vm.info, {
                            accountId: localStorage['userId'+sessionStorage['roleTypeId']]	
                        })
                        let temp = vm.codeOptions.reduce((arr, obj) => {
                            return obj.checked ? arr.concat(Object.assign({}, {code:obj.code,spaceTime:obj.spaceTime})) : arr
                        }, [])
                        if(temp.length==0){
                            this.$message({
                              message: '选择通知模板',
                              type: 'warning'
                            })
                            tips = false
                            return
                        }
                        temp.forEach( value => {
                            if(value.spaceTime ==null){
                                this.$message({
                                  message: '选择通知时间',
                                  type: 'warning'
                                })
                                tips = false
                            }
                        })
                        if(tips){
                            if (vm.nid) {
                                param.notificationId = vm.nid
                                param.privilegeCodes = JSON.stringify(temp)
                                vm.$post(vm.$api.notice.updateNotification, param).then(resp => {
                                    vm.$message.success('保存成功')
                                    vm.$router.push({ path: 'notice'})
                                })
                            } else {
                                param.privilegeCodes = JSON.stringify(temp)
                                vm.$post(vm.$api.notice.addNotification, param).then(resp => {
                                    vm.$message.success('保存成功')
                                    vm.$router.push({ path: 'notice'})
                                })
                            }
                        }
                    }else if(vm.info.type==1){
                        let tips = true
                        if(vm.info.spaceTime === ''){
                            console.log(123)
                            this.$message({
                                message: '请选择通知间隔',
                                type: 'warning'
                            })
                            tips = false
                            return 
                        }
                        if(tips){
                            if (vm.nid) {
                                let param = Object.assign({}, vm.info, {
                                accountId: localStorage['userId'+sessionStorage['roleTypeId']]	
                                })
                                param.notificationId = vm.nid
                                param.privilegeCodes = JSON.stringify([])
                                vm.$post(vm.$api.notice.updateNotification, param).then(resp => {
                                    vm.$message.success('保存成功')
                                    vm.$router.push({ path: 'notice'})
                                })
                             } else {
                                let param = Object.assign({}, vm.info, {
                                accountId: localStorage['userId'+sessionStorage['roleTypeId']]	
                                })
                                param.privilegeCodes = JSON.stringify([])
                                vm.$post(vm.$api.notice.addNotification, param).then(resp => {
                                    vm.$message.success('保存成功')
                                    vm.$router.push({ path: 'notice'})
                                })
                             }
                        }
                    }
                } else {
                    return false
                }
            })
        },
        getNotificationInfo (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                notificationId: id
            }
            vm.$get(vm.$api.notice.getNotificationInfo, param).then(resp => {
                resp.privilege = resp.privilege || []
                vm.info = {
                    noticeUserId: resp.userId,
                    status: resp.status,
                    type: resp.type,
                    mobile: resp.mobile,
                    spaceTime : resp.spaceTime,
                }
                vm.codeOptions = vm.codeOptions.map(obj => {
                    let temp = Object.assign({}, obj)
                    let privilegeObj = resp.privilege.find(item => item.code === temp.code)
                    if(privilegeObj) {
                        privilegeObj.checked = true
                    }
                    return privilegeObj || temp
                })
                vm.manage = {
                    logo: resp.avatar,
                    nickname: resp.nickname
                }
            })
        }
    },
    created () {
        this.getTemplateList()
        this.nid = this.$route.query.nid
        if (this.nid) {
            this.toggleName = '编辑角色通知人'
            this.getNotificationInfo(this.nid)
        }else{
            this.toggleName = '新增角色通知人'
        }
    },
}
</script>

<style lang="less">	
.edit_notice {
    .box-card {
        margin: 20px;
        .input-w {
            width: 238px;
        }
        .btn-margin {
            margin: 0 20px;
        }
        .assist {
            color: #ccc;
        }
        .name-user {
            height: 24px;
            line-height: 24px;
            vertical-align: middle;
            padding-left: 10px;
        }
        .img-user {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            vertical-align: middle;
        }
        .notice-template{
            .el-input__inner{
                height: 30px;
            }
        }
    }
}
</style>
