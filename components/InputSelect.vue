<template>
    <div class="select-box">
        <button type="button" v-if="!selectedOption">{{ placeholder }}</button>
        <button type="button" v-else>{{ selectedOption.label }}</button>
        <input type="hidden">
        <div class="select-list-box">
            <dl>
                <dd v-for="(option,index) in options" :key="index">
                    <a href="#" @click.prevent="() => select(option)">{{option.label}}</a>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>


export default {
    props: {
        default: {
            default: ""
        },
        placeholder: {
            required: true,
        },
        options: {
            required: true,
            default() {
                return [];
            }
        }
    },
    data(){
        return {
            selectedOption: ""
        }
    },

    methods: {
        select(option){
            this.selectedOption = option;

            this.$emit("change", option.value);
        },
    },

    mounted() {
        if(this.default)
            this.selectedOption = this.options.find(option => option.value == this.default);

    }
}
</script>
