<template>
    <li class="list-item" v-if="type === 'type-text'">
        <a :href="`/posts/show?id=${post.id}`">
            <div class="list-head">
                <div class="flex flex-vc flex-tj">
                    <strong>{{ post.title }}</strong>
                    <div class="list-info-box">
                        <dl>
                            <dd><b>{{ post.user.nickname }}</b></dd>
                            <dd>{{ post.format_created_at }}</dd>
                            <dd class="comment">{{ post.count_comment.toLocaleString() }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </a>
    </li>
    <li class="list-item" v-else-if="type === 'type-thumbnail01'">
        <a :href="`/posts/show?id=${post.id}`">
            <div class="list-image" :style="`background-image:url('${post.thumbnail}'); background-repeat:no-repeat; background-size:cover`"></div>

            <div class="list-content">
                <div class="list-subject">
                    <b v-if="post.hot">HOT</b>
                    <strong>{{ post.title }}</strong>
                </div>
                <div class="list-info-box">
                    <dl>
                        <dd><b>{{ post.user.nickname }}</b></dd>
                        <dd>{{ post.format_created_at }}</dd>
                        <dd class="comment">{{ post.count_view.toLocaleString() }}</dd>
                    </dl>
                </div>
            </div>
        </a>
    </li>
    <li class="list-item" v-else-if="type === 'type-thumbnail02'">
        <a :href="`/posts/show?id=${post.id}`">
            <div class="list-head">
                <div class="list-head-flex">
                    <div class="flex-image">
                        <img :src="post.thumbnail">
                    </div>
                    <div class="flex-content flex-1">
                        <strong>{{post.title}}</strong>
                        <div class="list-info-box">
                            <dl>
                                <dd><b>{{ post.user.nickname }}</b></dd>
                                <dd>{{ post.format_created_at }}</dd>
                                <dd class="comment">{{ post.count_comment.toLocaleString() }}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </li>
</template>
<script>
export default {
    props: {
        "post": {
            required: true
        },
        "type" : {
            default: "type-text"
        }
    }
}
</script>
