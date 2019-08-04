<template>
	<v-simple-table>
		<thead>
			<tr>
				<th class="text-left">時間</th>
				<th class="text-left">事件</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in desserts" :key="item.name">
				<td>{{ new Date(item.time ).toLocaleString()}}</td>
				<td>{{ item.name }}</td>
			</tr>
		</tbody>
	</v-simple-table>
</template><script>
export default {
	data() {
		return {
			desserts: [
				{
					name: "將逼比歷險記歸類到逼比特選",
					time: new Date()
				},
				{
					name: "將逼比歷險記發送到 Kindle",
					time: new Date() - 2000
				},
				{
					name: "上傳逼比歷險記",
					time:
						new Date() -
						1000 * 60 * 2 -
						Math.round(Math.random() * 20 * 1000)
				},
				{
					name: "上傳逼比寫真集",
					time:
						new Date() -
						1000 * 60 * 4 -
						Math.round(Math.random() * 20 * 1000)
				},
				{
					name: "上傳逼比特輯",
					time:
						new Date() -
						1000 * 60 * 6 -
						Math.round(Math.random() * 20 * 1000)
				}
			]
		};
	}
};
</script>