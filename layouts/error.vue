<template>
	<v-layout column justify-center align-center>
		<v-flex xs12 sm8 md6>
			<v-alert text color="error" min-width="400">
				<h3 class="headline">糟糕！發生了錯誤</h3>
				<div>{{error.statusCode === 404? pageNotFound:otherError }}</div>
				<v-divider class="my-4 error" style="opacity: 0.22"></v-divider>
				<v-layout align-center>
					<v-spacer></v-spacer>
					<v-btn color="error" outlined nuxt to="/">首頁</v-btn>
				</v-layout>
			</v-alert>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	layout: "empty",
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
		return {
			title
		};
	},
	data() {
		return {
			pageNotFound: "404 找不到頁面",
			otherError: "發生了錯誤"
		};
	}
};
</script>

<style scoped>
	h1 {
		font-size: 20px;
	}
</style>
