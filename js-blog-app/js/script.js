const postTitleInputNode = document.getElementById('input-title-post');
const postTextInputNode = document.getElementById('text-post');
const newPostBtnNode = document.getElementById('btn-new-post');
const postsNode = document.getElementById('post-list');
const validationMessage = document.getElementById('validation-message');
const currentLengthSymbolTitleNode = document.getElementById(
	'current-length-symbol-title'
);
const checkLengthTitleNode = document.getElementById('blog__form-length-title');
const currentLengthSymbolTextNode = document.getElementById(
	'current-length-symbol-text'
);
const checkLengthTextNode = document.getElementById('blog__form-length-text');

const posts = [];

const TITLE_VALIDATIN_LIMIT = 100;
const TEXT_VALIDATIN_LIMIT = 200;

newPostBtnNode.addEventListener('click', function () {
	const postFromUser = getPostFromUser();

	addPost(postFromUser);

	renderPosts();

	postTitleInputNode.value = '';
	postTextInputNode.value = '';

	currentLengthSymbolTitleNode.innerText = TITLE_VALIDATIN_LIMIT;
	currentLengthSymbolTextNode.innerText = TEXT_VALIDATIN_LIMIT;
});

postTitleInputNode.addEventListener('input', disabled);

postTextInputNode.addEventListener('input', disabled);

function disabled() {
	const titleLength = postTitleInputNode.value.length;
	const textLength = postTextInputNode.value.length;

	if (
		titleLength > TITLE_VALIDATIN_LIMIT ||
		textLength > TEXT_VALIDATIN_LIMIT
	) {
		newPostBtnNode.setAttribute('disabled', 'true');
		return;
	}
	newPostBtnNode.removeAttribute('disabled', 'true');
}

postTitleInputNode.addEventListener('input', renderLengthSymbolTitle);

postTextInputNode.addEventListener('input', renderLengthSymbolText);

function sumLengthSymbolTitle() {
	const changeNumber = postTitleInputNode.value.length;

	const sumTitle = TITLE_VALIDATIN_LIMIT - changeNumber;

	return sumTitle;
}

function sumLengthSymbolText() {
	const changeNumber = postTextInputNode.value.length;

	const sumText = TEXT_VALIDATIN_LIMIT - changeNumber;

	return sumText;
}

function renderLengthSymbolTitle() {
	const howLongTitle = sumLengthSymbolTitle();

	currentLengthSymbolTitleNode.innerText = howLongTitle;
}

function renderLengthSymbolText() {
	const howLongText = sumLengthSymbolText();

	currentLengthSymbolTextNode.innerText = howLongText;
}

postTitleInputNode.addEventListener('input', validation);

postTextInputNode.addEventListener('input', validation);

function validation() {
	const titleLength = postTitleInputNode.value.length;
	const textLength = postTextInputNode.value.length;

	if (titleLength > TITLE_VALIDATIN_LIMIT) {
		validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATIN_LIMIT} символов`;
		validationMessage.classList.remove('validation-message--hidden');
		return;
	}

	if (textLength > TEXT_VALIDATIN_LIMIT) {
		validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATIN_LIMIT} символов`;
		validationMessage.classList.remove('validation-message--hidden');
		return;
	}

	validationMessage.classList.add('validation-message--hidden');
}

// получить данные из поля ввода

function getPostFromUser() {
	const title = postTitleInputNode.value;
	const text = postTextInputNode.value;

	return {
		title: title,
		text: text,
	};
}

// сохранить пост

function addPost({ title, text }) {
	const currentDate = new Date();
	const getDate = currentDate.toLocaleString({
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	});

	const date = getDate;

	posts.push({
		date: date,
		title: title,
		text: text,
	});
}

function getPosts() {
	return posts;
}

// отобразить пост

function renderPosts() {
	const posts = getPosts();

	let postsHTML = '';

	posts.forEach(post => {
		postsHTML += `
		<div class='post'>
			<p class='post__date'>${post.date}</p>
			<p class='post__title'>${post.title}</p>
			<p class='post__text'>${post.text}</p>
		</div>
	`;
	});

	postsNode.innerHTML = postsHTML;
}

postTitleInputNode.addEventListener('input', checkValue);
postTextInputNode.addEventListener('input', checkValue);

function checkValue() {
	if (!postTitleInputNode.value || !postTextInputNode.value) {
		newPostBtnNode.setAttribute('disabled', 'true');
		return;
	}
	newPostBtnNode.removeAttribute('disabled', 'true');
}

