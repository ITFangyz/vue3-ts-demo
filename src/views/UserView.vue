<template>
    <div>
        用户列表
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getUserList,getRoleList} from '../request/api'

export default defineComponent({
    setup () {
        onMounted(() => {
            getUser(),
            getRole()
        })

        const getUser = () => {
            getUserList().then((res) => {
                console.log("获取用户列表", res)
            })
        }
        const getRole = () => {
            getRoleList().then((res) => {
                console.log("获取角色列表",res)
            })
        }
        return {
            getUser,
            getRole
        }
    }
})
</script>

<style scoped>

</style>