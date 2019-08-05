<template>
	<v-app>
		<v-navigation-drawer v-model="drawer" clipped fixed app>
			<v-list shaped>
				<v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar clipped-left fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title>Jadeface</v-toolbar-title>
			<v-spacer />
			<v-btn text icon @click.stop="changetheme">
				<v-icon>mdi-theme-light-dark</v-icon>
			</v-btn>
		</v-app-bar>
		<v-content>
			<v-container grid-list-md>
				<nuxt />
			</v-container>
		</v-content>
		<!--<v-footer app>
			<span>&copy; 2019</span>
		</v-footer>-->
	</v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: null,
		items: [
			{
				icon: "mdi-home",
				title: "首頁",
				to: "/"
			},
			{
				icon: "mdi-cloud-upload",
				title: "上傳書本",
				to: "/upload"
			},
			{
				icon: "mdi-book-multiple",
				title: "書庫",
				to: "/books"
			},
			{
				icon: "mdi-shape",
				title: "系列",
				to: "/series"
			},
			{
				icon: "mdi-card-text",
				title: "紀錄",
				to: "/log"
			}
		]
	}),
	methods: {
		changetheme() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
		}
	}
};
</script>
