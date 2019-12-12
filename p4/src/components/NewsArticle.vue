<template>
	<div id="NewsArticle">
		<div class="article">
			<div class="content">
				<!-- <img class="image-thumbnail" :src="article.urlToImage" onerror="this.style.display='none'" /> -->

				<image-item
					class="image-thumbnail"
					v-if="article.urlToImage && article.urlToImage.length>0"
					:source="article.urlToImage"
					onerror="this.style.display='none'"
				/>

				<div class="word-wrap">
					<a
						v-bind:href="article.url"
						class="link"
					>{{ article.title.substring(0, article.title.indexOf(" - ")) }}</a>
				</div>
				<p class="article-metadata">
					{{ article.source.name }} &middot;
					{{ timeSince(new Date(article.publishedAt)) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import ImageItem from "@/components/ImageItem.vue";

export default {
	name: "NewsArticle",
	components: {
		"image-item": ImageItem
	},
	props: {
		article: {
			type: Object,
			required: true
		}
	},
	data: function() {
		return {};
	}
};
</script>

<style scoped>
.article {
	border: 1px solid lightgray;
	padding: 10px;
	border-radius: 10px;
	position: relative;
	float: left;
	margin: 5px;
	width: 300px;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.article:hover {
	background-color: whitesmoke;
}

.content {
	align-self: center;
	/* font-size: larger; */
}

.image-thumbnail {
	float: left;
	max-height: 100px;
	max-width: 100px;
}

.no-image {
	display: none;
}

.word-wrap {
	white-space: pre-wrap; /* CSS3 */
	white-space: -moz-pre-wrap; /* Firefox */
	white-space: -pre-wrap; /* Opera <7 */
	white-space: -o-pre-wrap; /* Opera 7 */
	word-wrap: break-word; /* IE */
}

.link {
	color: black;
	text-decoration: none;
}

.link:hover {
	text-decoration: underline;
}

.article-metadata {
	font-size: smaller;
	color: dimgray;
	float: none;
}
</style>
