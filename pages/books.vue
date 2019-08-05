<template>
	<div>
		<parse-books :books="books" v-if="books" />
		<pre>{{books}}</pre>
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
			this.books = (await this.$axios.get("book")).data;
		}
	}
};
</script>
