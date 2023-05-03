<template>
    <div :class="`select-box ${active ? 'active' : ''}`">
        <button type="button" @click="active = !active" v-if="!selectedOption">{{ placeholder }}</button>
        <button type="button" @click="active = !active" v-else>{{ selectedOption.label }}</button>
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
            active: false,
            selectedOption: ""
        }
    },

    methods: {
        select(option){
            this.selectedOption = option;

            this.active = false;

            this.$emit("change", option.value);
        },
    },

    mounted() {
        if(this.default)
            this.selectedOption = this.options.find(option => option.value == this.default);

    }
}
</script>
