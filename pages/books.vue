<template>
	<parse-books :books="recent" />
</template><script>
export default {
	data: () => ({
		recent: [
			{
				name: "逼比探險記",
				img: "https://picsum.photos/1200/1200?5",
				author: "逼比",
				uuid: "biib1069"
			},
			{
				name: "逼比買了動物園",
				img: "https://picsum.photos/1200/1200?1",
				author: "逼比",
				uuid: "bibi1069"
			}
		]
	})
};
</script>
