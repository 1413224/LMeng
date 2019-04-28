<template>
    <div class="c-table">
        <table>
            <thead>
                <th v-for="(item, index) in thlabel" :key="index">{{label.label}}</th>
            </thead>
            <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                    <td v-for="(cell, i) in row" :key="i">
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        thlabel: {
            type: Array,
            default: function () {
                return []
            } 
        },
        tableData: {
            type: Array,
            default: function () {
                return []
            } 
        }
    },
    data () {

    }
}
</script>

<style lang="sess" scoped>
.c-table {

}
</style>
