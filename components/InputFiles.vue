<template>
    <div class="upload" v-if="!onlyShow">
        <label :for="id" class="find-file">
            파일 선택
            <input type="file" :id="id" @change="changeFile" multiple>
        </label>

        <ul class="upload-list col-group" v-if="files.length > 0">
            <li v-for="(file, index) in files" :key="index">
                <div class="text-box">
                    {{ file.name }}
                </div>
                <button type="button" class="del" @click="remove(index)">
                    <i class="xi-close"></i>
                </button>
            </li>
        </ul>
    </div>
    <div class="upload" v-else>
        <ul class="upload-list col-group" v-if="files.length > 0">
            <li v-for="(file, index) in files" :key="index">
                <a :href="file.url">
                    <div class="text-box">
                        {{ file.name }}
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<style>
.upload {
    display:flex; align-items: flex-start;
}
.find-file {
    width: 125px; height: 42px;
    margin-right:12px;
    line-height: 40px; font-size: 16px; text-align: center;
    border-radius: 21px; border: 1px solid #fe433a;
    background: #fff; color: #fe433a;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
    transition: .2s;
}
.upload-list {
    width: 100%; min-height: 42px;
    flex-flow: wrap;
    padding: 8px; gap: 8px;
    background: #f5f5f5; border-radius: 16px;
}
.upload-list li {
    display:flex; justify-content: space-between; align-items: center;
    margin-bottom:8px;
    padding: 4px 16px; padding-right: 8px;
    font-size: 14px; align-items: center;
    background: #fff; border-radius: 12px;
}
.upload-list li:last-of-type {
    margin-bottom:0;
}
.upload-list li button {
    font-size: 14px; font-weight: bold;
}
</style>
<script>
export default {
    props: {
        id: {
            default : "file"
        },
        default: {
            default() {
                return []
            }
        },
        required: {
            default: true
        },
        title: {
            required: false,
        },
        multiple: {
            default: false
        },
        onlyShow: {
            default: false,
        }
    },

    data(){
        return {
            files: this.default,
        }
    },

    methods: {
        changeFile(event) {
            this.files = Array.from(event.target.files).map(file => {
                return {
                    name: file.name,
                    file: file,
                };
            });

            this.$emit("change", this.files.map(file => file.file));
        },

        remove(index){
            this.files = this.files.filter((img, indexData) => indexData != index);

            this.$emit("change", this.files.map(file => file.file));
        }
    },

}
</script>
