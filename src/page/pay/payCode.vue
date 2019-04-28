<template>
    <div class="buy-code">
        <div class="nub-top">
			<h2>收钱码入口</h2>
		</div>
        <div class="clear">
            <div v-for="(item, index) in buyCode" :key="item" class="code">
                <div :id="item"></div>
                <span>{{index+1}}号入口</span>
                <el-button
                    style="margin-left: 10px;"
                    size="mini"
                    type="text"
                    icon="fa fa-link"
                    plain
                    @click="displayLinks(item)">
                </el-button>
            </div>
        </div>
        <el-dialog title="收钱码链接" :visible.sync="linkVise" width="680px">
			<div>
				<p style="border:1px solid #ccc;line-height: 40px;text-align: center;border-radius: 4px;">{{codeLink}}</p>
				<div style="text-align: right;">
					<el-button @click="copy" style="margin-top:10px;padding:8px 12px;" type="success">复制</el-button>
				</div>
			</div>
		</el-dialog>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    components: {
        QRCode
    },
    data () {
        return {
            buyCode: [],
            baseUrl: 'http://www.cgc999.com/collectmoney/index.html#/?no=',
            linkVise: false,
            codeLink: ''
        }
    },
    created () {
        if (window.location.host !== 'www.cgc999.com'){
            this.baseUrl = 'https://' + window.location.host + '/web/collectmoney/index.html#/?no='
        }
        this.getPayCode()
    },
    methods: {
        getPayCode () {
            let vm = this
            let param = {
	       		accountId: localStorage['userId' + sessionStorage['roleTypeId']]
	        }
            vm.$get(vm.$api.buy.getPayCode, param).then(resp => {
                vm.buyCode = resp
                vm.$nextTick(() => {
                    vm.buyCode.forEach(item => {
                        vm.qrcode(item)
                    })
                })
            })
        },
        qrcode(id){
            let url = this.baseUrl + id
			let qrcode = new QRCode(id, {  
				width: 200,  // 设置宽度 
				height: 200, // 设置高度
				text: url
		    })  
        },
        copy () {
			var oInput = document.createElement("input")
			oInput.value = this.codeLink
			document.body.appendChild(oInput)
			oInput.select() // 选择对象
			document.execCommand("Copy") // 执行浏览器复制命令
			oInput.className = "oInput"
			oInput.style.display = "none"
			this.$message({
				type: 'success',
				message: '复制成功'
			})
        },
        displayLinks(code){
			let vm = this 
			vm.codeLink = vm.baseUrl + code
			vm.linkVise = true
		},
    }
}
</script>

<style lang="less">
.buy-code {
    .code {
        margin: 20px 0 0 20px;
        background-color: #fff;
        height: 240px;
        width: 200px;
        padding: 20px 20px 0;
        text-align: center;
        line-height: 40px;
        float: left;
    }
}
</style>


