// TODO:
var comment_n = 1;
var comment_num = document.getElementById("comment-num");
comment_num.textContent = comment_n + "則留言";
function isEmpty(str){
    return !str.trim().length;
}
var cancel_button = document.getElementById("cancel-button");
var comment_button = document.getElementById("comment-button");
cancel_button.style.display = "none";
comment_button.style.display = "none";
var comment_input = document.getElementById("comment-input");
var comment = document.getElementsByClassName("comment")[0];
comment_input.addEventListener("input", function() {
	if(isEmpty(this.value)){
		comment_button.style.backgroundColor = "#cccccc";
		comment_button.disabled = true;
	}else{
		comment_button.style.backgroundColor = "#065fd4";
		comment_button.disabled = false;
	}
});
comment_input.addEventListener("focus", function() {
	cancel_button.style.display = "block";
	comment_button.style.display = "block";
});
comment_button.addEventListener("click", function() {
	console.log("click");
	this.style.backgroundColor = "#cccccc";
	let new_comment = comment.cloneNode(true);
	new_comment.getElementsByClassName("comment-text")[0].textContent = comment_input.value;
	document.getElementById("comment-group").append(new_comment);
	comment_input.value = "";
	this.disabled = true;
	comment_n++;
	comment_num.textContent = comment_n + "則留言";
});
cancel_button.addEventListener("click", function() {
	comment_input.value = "";
	cancel_button.style.display = "none";
	comment_button.style.display = "none";
});