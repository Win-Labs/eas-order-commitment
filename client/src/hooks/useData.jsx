const items = [];

function useData() {
  const pickMember = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const pickNum = (num) => Math.floor(Math.random() * num);

  return items.map((item) => item);
}
export default useData;
