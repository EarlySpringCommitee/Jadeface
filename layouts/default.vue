<template>
	<v-app dark>
		<v-navigation-drawer v-model="drawer" clipped fixed app>
			<v-list>
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
			<v-toolbar-title v-text="'Jadeface'" />
			<v-spacer />
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
				icon: "mdi-book-multiple",
				title: "書庫",
				to: "/inspire"
			},
			{
				icon: "mdi-shape",
				title: "分類",
				to: "/inspire"
			},
			{
				icon: "mdi-card-text",
				title: "紀錄",
				to: "/inspire"
			}
		]
	})
};
</script>
