<template>
	<div v-if="loaded">
		<br />
		<div class="headline">上傳書書</div>
		<br />
		<v-layout wrap>
			<v-flex xs12 md6>
				<v-autocomplete label="系列" :items="series" outlined v-model="bookseries" />
			</v-flex>
			<v-flex xs12 md6>
				<v-text-field v-model="bookno" label="冊數" outlined></v-text-field>
			</v-flex>
		</v-layout>
		<v-expand-transition>
			<v-alert
				color="cyan"
				border="left"
				elevation="2"
				colored-border
				icon="mdi-book"
				v-show="!bookseries||!bookno"
			>
				<h3 class="headline">哈囉！</h3>
				<div>請選擇系列並輸入冊數</div>
				<v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
				<v-layout>
					<div>貼心提醒：上傳書本後冊數將自動加一</div>
				</v-layout>
			</v-alert>
		</v-expand-transition>
		<v-expand-transition>
			<v-layout column v-show="bookseries&&bookno>0">
				<v-flex>
					<vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" useCustomSlot>
						<div class="dropzone-custom-content">
							<h3 class="dropzone-custom-title">將書書拖移到此處上傳</h3>
							<div class="subtitle">或是點選這裡來選取一個檔案</div>
						</div>
					</vue-dropzone>
				</v-flex>
			</v-layout>
		</v-expand-transition>
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
		bookseries: null,
		bookno: null,
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
			this.series = (await this.$axios.get("series")).data.map(x => ({
				text: x.title,
				value: x.id
			}));
			this.loaded = true;
		},
		beforeSend(file, xhr, formData) {
			formData.append("datas[0][series_id]", this.bookseries);
			formData.append("datas[0][no]", this.bookno);
			this.bookno++;
		}
	}
};
</script>
