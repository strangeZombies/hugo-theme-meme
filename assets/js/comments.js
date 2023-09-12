window.addEventListener("DOMContentLoaded", event => {
    // 加载CSS样式表
    function load_css() {
        const cssUrl = './style.css'
        const head = document.head || document.getElementsByTagName('head')[0]
        const style = document.createElement('link')
        style.rel = 'stylesheet'
        style.href = cssUrl
        head.appendChild(style)
    }

    load_css()

    var kv_comment_parent = null

    // 获取评论容器和API端点
    const container = document.querySelector('.kv-cmt');
    const endpoint = container.getAttribute('endpoint')

    //添加评论列表容器
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('kv-comments');
    commentsContainer.id = 'kv';
    container.appendChild(commentsContainer);

    //添加新评论容器
    const newCommentContainer = document.createElement('div');
    newCommentContainer.classList.add('kv-newcomment');
    newCommentContainer.innerHTML = `
<textarea name="kv-comment-value" id="kv-comment-value" placeholder="Comment here" cols="30" rows="10"></textarea>
<div class="kv-toolbar">
<span>New Comment / </span><span style="display: none;">New Reply / </span><span>BY </span><input type="text" name="kv-comment-user" id="kv-comment-user" value="匿名">
<button id="kv-comment-submit" >submit</button>
</div>
`;
    container.appendChild(newCommentContainer);

    const replyLabel = '<span class="kv-reply">reply</span>';


    //创建表示单个评论的HTML元素
    function createCommentElement(comment) {
        const commentElem = document.createElement('div');
        commentElem.id = `kv-${comment.key}`;
        commentElem.classList.add('kv-comment');
        commentElem.innerHTML = `
<div class="kv-body">
<div class="kv-stat">BY ${comment.user} / AT ${new Date(comment.time).toLocaleString()} ${replyLabel}</div>
<div class="kv-content">${comment.content}</div>
<hr class="kv-hr">
</div>
`;
        return commentElem;
    }

    //获取评论列表
    fetch(`${endpoint}/?url=${window.location.href}`)
        .then(response => response.json())
        .then(comments => {
            //遍历JSON数组并为每个评论创建HTML元素
            comments.forEach(comment => {
                const commentElem = createCommentElement(comment);
                if (!comment.key.includes('|')) {
                    commentsContainer.appendChild(commentElem);
                } else {
                    const id = comment.key;
                    const parentId = id.substring(0, id.lastIndexOf('|')); // 获取父级评论的 ID
                    const parentComment = document.getElementById(`kv-${parentId}`); // 查找元素
                    parentComment.appendChild(commentElem)
                }
            });
        });


    //为“回复”标签添加事件监听器
    commentsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('kv-reply')) {
            const commentElem = event.target.closest('.kv-comment');
            kv_comment_parent = commentElem.id.split('-')[1]
            const toolbar = newCommentContainer.querySelector('.kv-toolbar');
            toolbar.children[0].style.display = 'none';
            toolbar.children[1].style.display = '';
        }
    });

    //为提交增加监听器
    const submitBtn = document.getElementById('kv-comment-submit');
    submitBtn.addEventListener('click', async () => {
        const commentValue = document.getElementById('kv-comment-value').value;
        const commentUser = document.getElementById('kv-comment-user').value;

        // 构造请求体
        const requestBody = {
            url: window.location.href,
            content: commentValue,
            user: commentUser,
            parent: kv_comment_parent, // 假设已知父级评论的 ID
        };

        try {
            const response = await fetch(`${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const responseBody = await response.json();
                alert(responseBody.message);
            } else {
                console.error(`Failed to post comment. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Failed to post comment. Error: ${error}`);
        }
    });

    { { if .Site.Params.autoLoadComments } }
    if (typeof loadComments === 'function') {
        loadComments()
    }
    { { else } }
    const commentsToggle = document.getElementById('load-comments');

    if (commentsToggle !== null) {
        commentsToggle.addEventListener('click', function () {
            loadComments();
            this.style = "display: none";
        });
    }
    { { end } }
}, { once: true });
