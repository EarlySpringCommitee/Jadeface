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
