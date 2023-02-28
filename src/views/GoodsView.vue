<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="selectData.title" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="dataList.comList" stripe style="width: 100%" border>
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="introduce" label="描述" />
            </el-table>
            <el-pagination layout="prev, pager, next" @current-change="currentChange" @size-change="sizeChange" :total="selectData.count" />
        </div>
    </div>
</template>

<script lang="ts">
import { dataType } from 'element-plus/es/components/table-v2/src/common'
import { defineComponent, reactive, toRefs, computed, watch, onMounted} from 'vue'
import { getGoodsList } from "../request/api"
import { InitData,ListInt } from '../type/goods'

export default defineComponent({
    setup () {
        const data = reactive(new InitData())
        onMounted(() => {
            getGoods()
        });

        const getGoods = () => {
            getGoodsList().then( res => {
                // console.log("获取商品列表", res)
                data.list = res.data;   //接口返回的数据复制给列表
                data.selectData.count = res.data.length
            })
        }

        const currentChange = (page:number) => {
            data.selectData.page = page
        }
        const sizeChange = (pagesize:number) => {
            data.selectData.pagesize = pagesize
        }

        const dataList = reactive({
            comList:computed(() => {
                return data.list.slice((data.selectData.page-1)*data.selectData.pagesize, data.selectData.page*data.selectData.pagesize)
            })
        })
        

        const onSubmit = () => {
            // console.log("标题", data.selectData.title)
            // console.log("详情", data.selectData.introduce)
            let arr:ListInt[] = [] 
            if(data.selectData.title || data.selectData.introduce) {
                if(data.selectData.title){
                    arr = data.list.filter((value) => {
                        return value.title.indexOf(data.selectData.title) !== -1;
                    })
                }
                if(data.selectData.introduce){
                    arr = data.list.filter((value) => {
                        return value.introduce.indexOf(data.selectData.introduce) !== -1;
                    })
                }
            } else{
                arr = data.list
            }

            data.selectData.count = arr.length
            data.list = arr
        }

        watch([() => data.selectData.title , () => data.selectData.introduce], () => {
            if(data.selectData.title == "" || data.selectData.introduce == ""){
                getGoods()
            }
        });

        return {
            ...toRefs(data),
            currentChange,
            sizeChange,
            dataList,
            onSubmit,
            getGoods
        }
    }
})
</script>

<style scoped>

</style>