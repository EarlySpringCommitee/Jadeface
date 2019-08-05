<template>
	<div v-if="loaded">
		<br />
		<div class="headline">上傳書書</div>
		<br />
		<v-layout wrap>
			<v-flex xs12 md6>
				<v-autocomplete label="系列" :items="seriesTitle" outlined v-model="bookseries" />
			</v-flex>
			<v-flex xs12 md6>
				<v-text-field v-model="bookno" label="冊數" outlined></v-text-field>
			</v-flex>
		</v-layout>
		<v-layout column v-if="bookseries&&bookno">
			<v-flex>
				<vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" useCustomSlot>
					<div class="dropzone-custom-content">
						<h3 class="dropzone-custom-title">將書書拖移到此處上傳</h3>
						<div class="subtitle">或是點選這裡來選取一個檔案</div>
					</div>
				</vue-dropzone>
			</v-flex>
		</v-layout>
	</div>
	<div class="text-center" v-else>
		<v-progress-circular indeterminate color="primary"></v-progress-circular>
	</div>
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
			text-align: center
			.dropzone-custom-title 
				margin-top: 0
				color: #2196f3
</style>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
	created() {
		this.dropzoneOptions.url = this.$store.state.baseurl + "book";
		this.dropzoneOptions.sending = this.beforeSend;
		this.fetchSeries();
	},
	components: {
		vueDropzone: vue2Dropzone
	},
	data: () => ({
		series: null,
		seriesTitle: null,
		bookseries: "",
		bookno: Math.round(Math.random() * 999),
		loaded: false,
		dropzoneOptions: {
			url: "",
			paramName: "files",
			thumbnailWidth: 150,
			maxFilesize: 100,
			addRemoveLinks: true
		}
	}),
	methods: {
		async fetchSeries() {
			this.series = (await this.$axios.get("series")).data;
			this.seriesTitle = this.series.map(x => x.title);
			this.loaded = true;
		},
		beforeSend(file, xhr, formData) {
			formData.append(
				"datas[0][series_id]",
				this.series.filter(x => x.title == this.bookseries)[0].id
			);
			formData.append("datas[0][no]", this.bookno);
		}
	}
};
</script>
