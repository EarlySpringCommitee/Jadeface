<template>
	<v-layout column>
		<v-flex>
			<v-card>
				<v-card-title class="headline">上傳書書</v-card-title>
				<v-card-text>
					<vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" useCustomSlot>
						<div class="dropzone-custom-content">
							<h3 class="dropzone-custom-title">將書書拖移到此處上傳</h3>
							<div class="subtitle">或是點選這裡來選取一個檔案</div>
						</div>
					</vue-dropzone>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex>
			<v-card>
				<parse-books :books="recent">
					<v-card-title class="headline">最近新增</v-card-title>
				</parse-books>
			</v-card>
		</v-flex>
		<v-flex>
			<v-card>
				<v-card-title class="headline">轉換進度</v-card-title>
				<v-card-text>
					<v-simple-table fixed-header max-height="300px">
						<thead>
							<tr>
								<th class="text-left">名稱</th>
								<th class="text-left">進度</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in progress" :key="item.name">
								<td>{{ item.name }}</td>
								<td>{{ item.status }}</td>
							</tr>
						</tbody>
					</v-simple-table>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>
<style lang="sass">
	#dropzone 
		border-radius: 4px
		background: transparent
		.theme--dark &
			border: 2px solid rgba(255, 255, 255, 0.08)
		.dz-preview 
			.dz-details,.dz-image
				z-index: 1 !important
			*
				z-index: 1 !important
		.dropzone-custom-content 
			position: absolute
			top: 60%
			left: 50%
			transform: translate(-50%, -50%)
			text-align: center
			.dropzone-custom-title 
				margin-top: 0
				color: #2196f3
</style>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
	components: {
		vueDropzone: vue2Dropzone
	},
	data: () => ({
		recent: [
			{
				name: "逼比探險記",
				img: "https://picsum.photos/1200/1200?5",
				author: "逼比",
				uuid: "biib1069"
			},
			{
				name: "逼比買了動物園",
				img: "https://picsum.photos/1200/1200?1",
				author: "逼比",
				uuid: "bibi1069"
			}
		],
		progress: [
			{
				name: "逼比探險記",
				status: "轉換中"
			},
			{
				name: "逼比買了動物園",
				status: "佇列中"
			}
		],
		dropzoneOptions: {
			url: "https://httpbin.org/post",
			thumbnailWidth: 150,
			maxFilesize: 100,
			addRemoveLinks: true,
			headers: { "My-Awesome-Header": "header value" }
		}
	})
};
</script>
