<template>
	<v-container grid-list-md>
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
			<v-flex v-for="item in books" :key="item.uuid" xs6 md3>
				<v-item>
					<v-card>
						<v-img class="white--text" height="500px" :src="'http://172.25.24.2:3000/'+item.cover_id" />
						<v-card-title>{{item.title}}</v-card-title>
						<v-card-text>{{item.desc}}</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn color="primary" outlined>詳細資料</v-btn>
							<v-btn color="primary">發送到 Kindle</v-btn>
						</v-card-actions>
					</v-card>
				</v-item>
			</v-flex>
		</v-layout>
		<v-data-table :headers="headers" :items="books" sort-by="name" multi-sort v-if="view==='list'">
			<template v-slot:item.actions="{ item }">
				<v-icon small>mdi-pencil</v-icon>
				<v-icon small>mdi-send</v-icon>
				<v-icon small>mdi-delete</v-icon>
			</template>
		</v-data-table>
	</v-container>
</template>
<script>
export default {
	name: "parse-books",
	props: ["books"],
	data: () => ({
		view: "card",
		headers: [
			{ text: "標題", value: "title" },
			{ text: "簡介", value: "desc" },
			{ text: "", value: "actions", sortable: false }
		]
	})
};
</script>
