<template>
	<div>
		<parse-books :books="books" :fetchData="fetchData" v-if="books" />
	</div>
</template>
<script>
export default {
	async created() {
		this.fetchData();
	},
	data: () => ({
		books: null
	}),
	methods: {
		async fetchData() {
			this.books = (await this.$axios.get("book?filetype=mobi")).data;
		}
	}
};
</script>
