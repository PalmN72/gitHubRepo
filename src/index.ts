import "./styles/index.css";

const btn = document.querySelector('button');

const loader = document.querySelector(".loader");

type repoObject = {
  name: string,
  html_url: string,
  description: string,
  language: string,
  owner: {
    avatar_url: string,
    login: string,
    html_url: string;
  };
};

const displayLoading = (els: [repoObject]) => {
  loader.classList.add("display");
  setTimeout(() => {
    els.forEach((element: repoObject) => {
      createSectionList(element);
    });

    createAsideProfile(els[0]);

    hideLoading();
  }, 3000);
};

const hideLoading = () => {
  loader.classList.remove("display");
};

const callGitHubApi = async (user: string) => {
  const url = `https://api.github.com/users/${user}/repos`;
  const data = await (await fetch(url)).json();
  return data;
};

const structureData = async () => {
  const userName = document.querySelector('input').value;
  const repos = await callGitHubApi(userName);
  displayLoading(repos);
};

const templateProfile = document.getElementsByTagName('template')[0];
const templateList = document.getElementsByTagName("template")[1];

const createAsideProfile = (data: repoObject) => {
  const clone = document.importNode(templateProfile, true);

  clone.content.querySelector('.repo-owner-img').setAttribute('src', data.owner.avatar_url);
  clone.content.querySelector('.repo-owner-name').textContent = data.owner.login;
  clone.content.querySelector('.repo-owner-name').setAttribute('href', data.owner.html_url);

  const aside = clone.content.cloneNode(true);
  document.querySelector('aside').append(aside);
};

const createSectionList = (data: repoObject) => {

  const clone = document.importNode(templateList, true);

  clone.content.querySelector('.repo-name').textContent = data.name;
  clone.content.querySelector('.repo-name').setAttribute('href', `${data.html_url}`);
  clone.content.querySelector('.repo-description').textContent = data.description;
  clone.content.querySelector('.item-language').textContent = data.language;
  clone.content.querySelector('.stars').setAttribute('href', `${data.html_url}/stargazers`);
  clone.content.querySelector('.forks').setAttribute('href', `${data.html_url}/forks`);

  if (data.language === 'JavaScript') clone.content.querySelector('.item-language').setAttribute('class', 'javascript');
  if (data.language === 'TypeScript') clone.content.querySelector('.item-language').setAttribute('class', 'typescript');
  if (data.language === 'CSS') clone.content.querySelector('.item-language').setAttribute('class', 'css');
  if (data.language === 'HTML') clone.content.querySelector('.item-language').setAttribute('class', 'html');
  if (data.language === 'SCSS') clone.content.querySelector('.item-language').setAttribute('class', 'scss');
  if (data.language === 'Java') clone.content.querySelector('.item-language').setAttribute('class', 'java');
  if (data.language === 'Rust') clone.content.querySelector('.item-language').setAttribute('class', 'rust');
  if (data.language === 'Shell') clone.content.querySelector('.item-language').setAttribute('class', 'shell');
  if (data.language === 'C#') clone.content.querySelector('.item-language').setAttribute('class', 'c-sharp');
  if (data.language === 'C++') clone.content.querySelector('.item-language').setAttribute('class', 'c-plus-plus');
  if (data.language === 'C') clone.content.querySelector('.item-language').setAttribute('class', 'c');
  if (data.language === 'HCL') clone.content.querySelector('.item-language').setAttribute('class', 'hcl');
  if (data.language === 'Dockerfile') clone.content.querySelector('.item-language').setAttribute('class', 'dockerfile');
  if (data.language === 'Go') clone.content.querySelector('.item-language').setAttribute('class', 'go');
  if (data.language === 'Coffeescript') clone.content.querySelector('.item-language').setAttribute('class', 'coffeescript');
  if (data.language === 'Objective-C') clone.content.querySelector('.item-language').setAttribute('class', 'objective-c');

  const section = clone.content.cloneNode(true);
  document.body.append(section);
};

btn.addEventListener('click', () => {
  if (document.querySelector('.repo')) document.querySelectorAll('.repo').forEach(e => e.remove());
  if (document.querySelector('.repo-owner-profile')) document.querySelector('.repo-owner-profile').remove();
  structureData();
});