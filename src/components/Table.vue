<template>
  <div class="shadow-sm p-2 mt-4 rounded-lg">
    <div v-if="fetchError"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ fetchError }}
    </div>
    <div v-if="loading" class="flex items-center justify-center p-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500">
      </div>
    </div>

    <div v-else>
      <div v-if="skuList.length > 0" class="flex flex-col bg-white">
        <div class="-m-1.5 overflow-x-auto">
          <div class="pt-1.5 min-w-full inline-block align-middle">
            <div class="border rounded-lg divide-y divide-gray-200">
              <div class="py-3 px-4 mb-2 rounded-lg">
                <div class="relative max-w-xs">
                  <label class="sr-only">Search</label>
                  <input v-model="searchQuery" type="text"
                    id="hs-table-with-pagination-search"
                    class="py-2 px-3 block w-full shadow-md bg-gray-100 border-purple-400 border-b-2 rounded-lg text-sm"
                    placeholder="Search for items">
                </div>
              </div>

              <table class="min-w-full divide-y divide-purple-300 mb-2 text-xs">
                <thead class="bg-gray-100 text-center">
                  <tr>
                    <th
                      class="p-3 text-start text-xs font-medium text-gray-500 uppercase">
                      SKU</th>
                    <th
                      class="p-3 text-start text-xs font-medium text-gray-500 capitalize">
                      Product Name</th>
                    <th
                      class="p-3 text-start text-xs font-medium text-gray-500 capitalize text-right">
                      <p>First Selected Date</p>
                      <p>Sales / Units / Avg Price</p>
                    </th>
                    <th v-if="skuList[0].isDatesCompared"
                      class="p-3 text-start text-xs font-medium text-gray-500 capitalize text-right">
                      <p>Second Selected Date</p>
                      <p>Sales / Units / Avg Price</p>
                    </th>
                    <th
                      class="p-3 text-end text-xs font-medium text-gray-500 capitalize">
                      <p>Refund Rate</p>
                      <p>(Last {{ selectedDayRange }} Days)</p>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-left px-2">
                  <template v-if="paginatedSkuList.length > 0">
                    <tr v-for="item in paginatedSkuList" :key="item.sku"
                      class="px-3">
                      <td class="p-3" v-html="highlightText(item.sku)"></td>
                      <td class="p-3" v-html="highlightText(item.productName)">
                      </td>
                      <td class="p-3 text-right text-green-500 font-semibold">
                        {{ storeCurrency + item.totalSalesOne }} / {{
                          item.totalSoldUnitsOne }} / {{ storeCurrency +
                          item.averageSalesOne }}
                      </td>
                      <td v-if="item.isDatesCompared"
                        class="p-3 text-right text-red-500 font-semibold">
                        {{ storeCurrency + item.totalSalesTwo }} / {{
                          item.totalSoldUnitsTwo }} / {{ storeCurrency +
                          item.averageSalesTwo }}
                      </td>
                      <td class="p-3 text-center font-semibold">{{
                        item.refundRate }}
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="5"
                        class="p-3 text-center text-gray-500 font-semibold">
                        No results found
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>


              <div class="py-2 px-4">
                <nav class="flex items-center space-x-1 justify-center gap-3"
                  aria-label="Pagination">
                  <button @click="prevPage" :disabled="currentPage === 1"
                    :class="{
                      'text-purple-300 cursor-not-allowed': currentPage === 1,
                      'text-purple-600': currentPage !== 1
                    }">
                    «
                  </button>

                  <button v-for="page in totalPages" :key="page"
                    @click="goToPage(page)" :class="{
                      'font-bold bg-purple-600 text-white px-3 py-1 rounded-full': currentPage === page,
                      'text-purple-600': currentPage !== page
                    }">
                    {{ page }}
                  </button>

                  <button @click="nextPage"
                    :disabled="currentPage === totalPages" :class="{
                      'text-purple-300 cursor-not-allowed': currentPage === totalPages,
                      'text-purple-600': currentPage !== totalPages
                    }">
                    »
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const loading = computed(() => store.state.skuList.loading);
const fetchError = computed(() => store.state.skuList.fetchError);
const skuList = computed(() => store.state.skuList.skuList);
const storeCurrency = store.getters['sales/getCurrency'];
const selectedDayRange = store.getters['sales/getSelectedDayRange'];

// TODO: Selected Days are missing on the table
// TODO: Selected Day Range should be dynamically changed depending on the user action on ChartHeader

const currentPage = ref(1);
const itemsPerPage = 10;

const searchQuery = ref("");

const filteredSkuList = computed(() => {
  if (searchQuery.value) {
    return skuList.value.filter(item =>
      item.sku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  else {
    console.log(store.state.skuList)
    return skuList.value;
  }
}
);

const paginatedSkuList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredSkuList.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredSkuList.value.length / itemsPerPage));

watch(searchQuery, () => currentPage.value = 1);


const goToPage = (page) => {
  currentPage.value = page;
  if (page > 3 && skuList.value.length < (page * itemsPerPage)) {
    store.dispatch('skuList/fetchSkuList', { pageNumber: Math.ceil(page / 3) });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1);
};

const prevPage = () => {
  if (currentPage.value > 1) goToPage(currentPage.value - 1);
};

const highlightText = (text) => {
  if (!searchQuery.value) return text;
  const escapedQuery = searchQuery.value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
};

watch(
  () => [store.state.skuList.selectedDate, store.state.skuList.selectedDate2],
  async ([selectedDate, selectedDate2]) => {
    if (selectedDate) {
      await store.dispatch('skuList/fetchSkuList', { selectedDate, selectedDate2, pageNumber: 1 });
      await store.dispatch('skuList/fetchSkuRefundRate');
    }
  },
  { deep: true }
);

watch(
  () => store.state.sales.selectedDayRange,
  async (selectedDayRange) => {
    if (selectedDayRange) {
      await store.dispatch('skuList/fetchSkuRefundRate');
    }
  },
  { deep: true }
);
</script>


<style lang="scss">
.highlight
{
  @apply bg-purple-500 text-white font-semibold rounded-sm px-1
}
</style>
