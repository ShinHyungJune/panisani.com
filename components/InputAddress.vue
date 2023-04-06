<template>
    <div class="m-input-address">
        <div class="m-input-wrap m-input-withBtn">
            <div class="m-input-text">
                <input type="text" placeholder="주소" v-model="form[address]" :name="address" @change="change" disabled>
            </div>

            <button type="button" class="m-input-btn" id="find_address">
                우편번호 검색
            </button>
        </div>

        <div class="m-input-wrap" style="margin-top:8px;">
            <div class="m-input-text" v-if="!form[address]">
                <input type="text" placeholder="상세주소" v-model="form[address_detail]" :name="address_detail" id="address_detail" @change="change" disabled>
            </div>
            <div class="m-input-text" v-else>
                <input type="text" placeholder="상세주소" v-model="form[address_detail]" :name="address_detail" id="address_detail" @change="change">
            </div>
        </div>

        <div class="m-input-wrap" style="display:none;">
            <div class="m-input-text">
                <input type="text" disabled placeholder="우편번호" v-model="form[address_zipcode]" :name="address_zipcode" id="address_zipcode" style="width:150px; margin-top:10px;" @change="change">
            </div>
        </div>
    </div>
</template>
<style>
.m-input-address {
    flex:auto;
}
.m-input-text {
    border: 1px solid #c7c7c7;
}
.m-input-text input {
    height: 56px; width: 100%;
    padding: 0 16px;
    font-size: 18px;
}
.m-input-withBtn {
    display:flex;
}
.m-input-withBtn .m-input-text {
    flex:auto;
}
.m-input-withBtn .m-input-btn {
    flex:0 0 auto;
    margin-left:10px;
    padding: 0 20px;
    font-size: 14px; font-weight: bold;     text-align: center;
    border: 1px solid #c7c7c7;
    transition: .3s;

}
</style>
<script>
export default {
    props: {
        form: {
            default : {
                errors: {}
            }
        },
        address: {
            default: "address"
        },
        address_detail: {
            default: "address_detail"
        },
        address_zipcode: {
            default: "address_zipcode"
        },
        activated: false,
    },
    data(){
        return {

        }
    },

    methods: {
        change(e){
            e.preventDefault();

            this.emit(e.target.name, e.target.value);
        },

        emit(name, value){
            this.$emit("change", {
                name: name,
                value: value
            });
        }
    },

    mounted() {
        let self = this;

        document.getElementById("find_address").addEventListener("click", function(){ //주소입력칸을 클릭하면
            //카카오 지도 발생
            new daum.Postcode({
                oncomplete: function(data) { //선택시 입력값 세팅
                    document.getElementById("address_detail").focus(); // 주소 넣기

                    self.emit(self.address, data.address);
                    self.emit(self.address_zipcode, data.zonecode);
                }
            }).open();
        });
    }
}
</script>
