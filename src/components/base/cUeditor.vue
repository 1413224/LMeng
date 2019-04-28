<template>
	<script ref="editor" type="text/plain"></script>
</template>


<script>
/* eslint-disable */
import "../../../static/ueditor-utf8-jsp/ueditor.config.js";
import "../../../static/ueditor-utf8-jsp/ueditor.all.js";
import "../../../static/ueditor-utf8-jsp/lang/zh-cn/zh-cn.js";
export default {
    name: "ueditor",
    data() {
        return {
            id: "ueditorId" + Math.random().toString(16).substring(2),
            editor: null
        };
	},
	model: {
		prop: 'value',
      	event: 'input'
	},
    props: {
        value: {
            type: String,
            default: ''
        },
        config: {
            type: Object,
            default: function() {
                return {
                    // autoHeightEnabled: false,
                    // autoFloatEnabled: true,
                    // initialContent: "",
                    autoClearinitialContent: true,
                    // initialFrameWidth: null,
                    // initialFrameHeight: 450,
                    // BaseUrl: "",
                    UEDITOR_HOME_URL: "./static/ueditor-utf8-jsp/"
                };
            }
        }
    },
    watch: {},
    mounted() {
        this.$nextTick(function f1() {
            // 保证 this.$el 已经插入文档
            this.$refs.editor.id = this.id;
            this.editor = UE.getEditor(this.id, this.config);
            this.editor.ready(
                function f() {
					this.editor.setContent(this.value);
					this.editor.addListener("contentChange", function() {
							let content = this.editor.getContent();
                            // 编辑器内容有变动,通知父组件
                            this.$emit("input", content);
                        }.bind(this)
					);
					this.editor.addListener("selectionchange", function() {
							let content = this.editor.getContent();
                            // 编辑器内容有变动,通知父组件
                            this.$emit("input", content);
                        }.bind(this)
					);
                    // editor初始化后操作
                    this.$emit("ready", this.editor);
                }.bind(this)
            );
        });
    },
    destroyed() {
        this.editor.destroy();
    },
    watch: {},
    methods: {
        getUEContent: function() {
            //对外暴露的获取富文本内容接口
            return {
                contnet: this.editor.getContent(),
                imgId: sessionStorage["ueditorImgId"]
            };
        },
        setUEContent: function(data) {
            //对外暴露的获取富文本内容接口
            this.editor.ready(
                function f() {
					this.value = data
                    this.editor.setContent(data, false);
                }.bind(this)
            );
        },
        destroyUE() {
            //对外暴露销毁组件接口
            this.editor.destroy();
        }
    }
};
</script>
