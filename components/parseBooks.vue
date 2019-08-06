<template>
	<v-container grid-list-md v-if="books.length>0">
		<v-layout justify-space-between row>
			<slot />
			<v-spacer />
			<v-btn-toggle v-model="view" mandatory>
				<v-btn value="card">
					<v-icon>mdi-view-grid</v-icon>
				</v-btn>
				<v-btn value="list">
					<v-icon>mdi-view-list</v-icon>
				</v-btn>
			</v-btn-toggle>
		</v-layout>
		<br />
		<v-layout v-if="view==='card'" wrap>
			<v-flex v-for="item in books" :key="item.uuid" xs12 sm6 md3>
				<v-item>
					<v-card>
						<v-img class="white--text" height="500px" :src="$store.state.baseurl+item.cover_id" />
						<v-card-title>{{item.title}}</v-card-title>
						<v-card-text>{{item.desc&&item.desc.length>150?(item.desc.substr(0,150)+'...'):item.desc}}</v-card-text>
						<v-card-actions class="hidden-sm-and-down">
							<v-btn color="primary" text outlined @click="info(item)">詳細資料</v-btn>
							<v-spacer />
							<v-btn color="primary" @click="send(item)">發送到 Kindle</v-btn>
						</v-card-actions>
						<v-card-actions class="hidden-md-and-up">
							<v-btn color="primary" text outlined @click="info(item)">詳細</v-btn>
							<v-spacer />
							<v-btn color="primary" @click="send(item)">發送</v-btn>
						</v-card-actions>
					</v-card>
				</v-item>
			</v-flex>
		</v-layout>
		<v-data-table :headers="headers" :items="books" sort-by="name" multi-sort v-if="view==='list'">
			<template v-slot:item.desc="{ item }">
				<p>{{item.desc&&item.desc.length>60?(item.desc.substr(0,60)+'...'):item.desc}}</p>
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small @click="info(item)">mdi-information</v-icon>
				<v-icon small @click="send(item)">mdi-send</v-icon>
			</template>
		</v-data-table>
		<v-dialog v-model="bookDialog" fullscreen transition="dialog-bottom-transition">
			<v-card>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="close">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>詳細資料</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn dark text @click="save">Save</v-btn>
					</v-toolbar-items>
				</v-toolbar>

				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md6 xl4>
								<v-text-field outlined v-model="editedBook.title" label="標題" />
							</v-flex>
							<v-flex xs12 sm6 md6 xl4>
								<v-autocomplete label="系列" :items="series" outlined v-model="editedBook.series_id" />
							</v-flex>
							<v-flex xs12 sm12 md6 xl4>
								<v-text-field outlined v-model="editedBook.cover_id" readonly label="封面路徑" />
							</v-flex>
							<v-flex xs12 sm12 md6 xl4>
								<v-text-field
									outlined
									v-model="editedBook.filepath"
									readonly
									label="檔案路徑"
									append-outer-icon="mdi-download"
								>
									<template v-slot:append-outer>
										<v-icon @click="download">mdi-download</v-icon>
									</template>
								</v-text-field>
							</v-flex>
							<v-flex>
								<v-textarea outlined v-model="editedBook.desc" label="說明" />
							</v-flex>
						</v-layout>
						<v-card-actions>
							<v-btn color="blue darken-1" text @click="del">Delete</v-btn>
						</v-card-actions>
					</v-container>
				</v-card-text>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="sent" :timeout="1500">已發送</v-snackbar>
		<v-snackbar v-model="error" :timeout="1500">發生錯誤</v-snackbar>
		<v-snackbar v-model="downloadStart" :timeout="1500">已開始下載</v-snackbar>
	</v-container>
	<v-container grid-list-md v-else>
		<v-alert color="cyan" border="left" elevation="2" colored-border icon="mdi-book">
			<h3 class="headline">這裡沒有任何書書</h3>
			<div>請前往上傳頁面上傳尼ㄉ可愛書書</div>
			<v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
			<v-layout align-center>
				<v-spacer></v-spacer>
				<v-btn color="info" outlined nuxt to="/upload">上傳頁面</v-btn>
			</v-layout>
		</v-alert>
	</v-container>
</template>
<script>
export default {
	name: "parse-books",
	props: ["books", "fetchData"],
	created() {
		this.fetchSeries();
	},
	data: () => ({
		view: "card",
		headers: [
			{ text: "標題", value: "title" },
			{ text: "簡介", value: "desc" },
			{ text: "", value: "actions", sortable: false }
		],
		bookDialog: null,
		series: null,
		seriesComplete: null,
		sent: null,
		error: null,
		downloadStart: null,
		editedIndex: -1,
		editedBook: {
			id: -1,
			series_id: -1,
			title: null,
			no: -1,
			filepath: null,
			upload_time: new Date(),
			desc: null,
			cover_id: null,
			filetype: null
		},
		defaultBook: {
			id: -1,
			series_id: -1,
			title: null,
			no: -1,
			filepath: null,
			upload_time: new Date(),
			desc: null,
			cover_id: null,
			filetype: null
		}
	}),
	methods: {
		async fetchSeries() {
			this.series = (await this.$axios.get("series")).data.map(x => ({
				text: x.title,
				value: x.id
			}));
		},
		send(item) {
			this.sent = true;
		},
		info(item) {
			this.editedIndex = this.books.indexOf(item);
			this.editedBook = Object.assign({}, item);
			this.bookDialog = true;
		},
		close() {
			this.bookDialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
		},
		async del() {
			if (!confirm("尼確定要殺掉他嗎")) return;
			await this.$axios.delete(`book`, {
				data: { book: [this.editedBook.id] }
			});
			this.close();
			this.fetchData();
		},
		download() {
			this.$axios({
				method: "get",
				url: this.editedBook.filepath,
				responseType: "arraybuffer"
			})
				.then(response => {
					this.forceFileDownload(response);
					this.downloadStart = true;
				})
				.catch(() => (this.error = true));
		},
		async save() {
			if (this.editedIndex > -1) {
				await this.$axios.patch(`book?id=${this.editedBook.id}`, {
					book: [this.editedBook]
				});
			} else {
				this.error = true;
			}
			this.fetchData();
			this.close();
		},
		forceFileDownload(response) {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				this.editedBook.title + "." + this.editedBook.filetype
			); //or any other extension
			document.body.appendChild(link);
			link.click();
		}
	}
};
</script>
