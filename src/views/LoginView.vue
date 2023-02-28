<template>
    <div class="login-box">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <h2>后台管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="ruleForm.username"  autocomplete="off" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="ruleForm.password"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            
            <el-form-item>
                <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref} from 'vue'
import { LoginData } from "../type/login"
import type { FormInstance } from 'element-plus'
import {login } from '../request/api'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup () {
        const data = reactive(new LoginData()) 
        // const data = reactive({
        //     ruleForm:{
        //         username: "",
        //         password: ""
        //     },
        // });
        const rules = {
            username:[
                {
                    required: true,
                    message: "请输入账号",
                    trigger: "blur"
                },
                {
                    min: 3,
                    max: 10,
                    message: "账号长度在3-10之间",
                    trigger: "blur"
                }
            ],
            password:[
                {
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                },
                {
                    min: 3,
                    max: 10,
                    message: "密码长度在3-10之间",
                    trigger: "blur"
                }
            ]
        }

        const ruleFormRef = ref<FormInstance>()
        const router = useRouter()      //相当于$router
        const submitForm = (formEl: FormInstance | undefined) => {

            if (!formEl) return
            formEl.validate((valid) => {
                console.log("valid", valid)
                if (valid) {
                    // 登录账号admin 密码123456
                    console.log('submit!')
                    login(data.ruleForm).then((res) => {
                        console.log("提交成功res",res)
                        // 将token进行保存
                        // localStorage.setItem('token', res.data.token)
                        // 跳转页面
                        // router.push('/')
                    })
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }

        return {
            ...toRefs(data),
            rules,
            ruleFormRef,
            submitForm
        }
    }
})
</script>

<style lang="scss" scoped>
.login-box{
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg");
    text-align: center;
    .demo-ruleForm{
        width: 500px;
        margin: 200px 600px;
        position: absolute;
        background-color: #FFF;
        padding: 30px;
        border-radius: 40px;
    }
    .loginBtn{
        width: 48%;
    }
    h2{
        margin-bottom: 20px;
    }
}
    
</style>