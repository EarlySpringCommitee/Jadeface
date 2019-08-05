<template>
	<div>
		<v-data-table :headers="headers" :items="series" sort-by="id" multi-sort v-if="series">
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>系列</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn color="primary" dark class="mb-2" @click="seriesDialog = true">新增系列</v-btn>
				</v-toolbar>
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small @click="editItem(item)">mdi-pencil</v-icon>
				<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
			</template>
		</v-data-table>
		<v-dialog v-model="seriesDialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }}</span>
				</v-card-title>

				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.title" label="標題"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.author" label="作者"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.cover_id" label="cover_id"></v-text-field>
							</v-flex>
							<v-flex>
								<v-text-field v-model="editedItem.desc" label="說明"></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
					<v-btn color="blue darken-1" text @click="save" v-if="editedIndex === -1 ">Create</v-btn>
					<v-btn color="blue darken-1" text @click="save" v-else>Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
export default {
	async created() {
		this.fetchData();
	},
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "新增系列" : "修改系列";
		}
	},
	data: () => ({
		series: null,
		seriesDialog: false,
		editedIndex: -1,
		editedItem: { title: "", author: "", desc: "", cover_id: "", id: -1 },
		defaultItem: { title: "", author: "", desc: "", cover_id: "", id: -1 },
		headers: [
			{ text: "編號", value: "id" },
			{ text: "標題", value: "title" },
			{ text: "作者", value: "author" },
			{ text: "說明", value: "desc" },
			{ text: "cover_id", value: "cover_id" },
			{ text: "", value: "actions", sortable: false }
		]
	}),
	methods: {
		async fetchData() {
			this.series = (await this.$axios.get("series")).data;
		},
		editItem(item) {
			this.editedIndex = this.series.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.seriesDialog = true;
		},
		async deleteItem(item) {
			if (!confirm("尼確定要殺掉他嗎")) return;
			await this.$axios.delete(`series`, {
				data: { series: [{ id: [item.id] }] }
			});
			this.fetchData();
		},
		close() {
			this.seriesDialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
		},
		async save() {
			if (this.editedIndex > -1) {
				await this.$axios.patch(`series?id=${this.editedItem.id}`, {
					series: [this.editedItem]
				});
			} else {
				await this.$axios.post("series", {
					series: [this.editedItem]
				});
			}
			this.fetchData();
			this.close();
		}
	}
};
</script>
