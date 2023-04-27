const saveArticleBtn = document.getElementById('save-article');
const articlesList = document.getElementById('articles-list');

chrome.storage.sync.get('articles', function(data) {
  data.articles.forEach(article => {
    addArticleToList(article);
  });
});

saveArticleBtn.addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    chrome.storage.sync.get('articles', function(data) {
      if (data.articles.length < 6) {
        data.articles.push(currentTab.url);
        chrome.storage.sync.set({ articles: data.articles });
        addArticleToList(currentTab.url);
      } else {
        alert('Please read the saved articles before saving more.');
      }
    });
  });
});

function addArticleToList(url) {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = url;
  link.textContent = url;
  link.target = '_blank';
  listItem.appendChild(link);
  articlesList.appendChild(listItem);
}
