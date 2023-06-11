var subArr = [];
var obj = {
    'Chọn khoa': [],
    'Toàn bộ khoa': [
        'Toán chuyên đề',
        'Toán cao cấp',
        'Toán rời rạc',
        'Lập trình căn bản',
        'Lập trình hướng đối tượg',
        'Phân tích thiết kế hệ thống',
        'Kiến trúc máy tính và hợp ngữ',
        'An toàn cơ sở dữ liệu',
        'An toàn mạng máy tính',
        'Chính sách an toàn hệ thống thông tin',
    ],
    'Khoa Cơ bản': ['Toán chuyên đề', 'Toán cao cấp', 'Toán rời rạc'],
    'Khoa Công nghệ thông tin': [
        'Lập trình căn bản',
        'Lập trình hướng đối tượg',
        'Phân tích thiết kế hệ thống',
        'Kiến trúc máy tính và hợp ngữ',
    ],
    'Khoa An toàn thông tin': [
        'An toàn cơ sở dữ liệu',
        'An toàn mạng máy tính',
        'Chính sách an toàn hệ thống thông tin',
    ],
};
var departmentSel = document.getElementById('department');
var subjectSel = document.getElementById('subject');
var selectedSel = document.getElementById('selected');
window.onload = function () {
    for (var x in obj) {
        const node = document.createElement('button');
        const br = document.createElement('br');
        const textNode = document.createTextNode(x);
        node.appendChild(textNode);
        departmentSel.appendChild(node);
        departmentSel.appendChild(br);
        node.classList.add('btn', 'mb-3');
        node.onclick = function () {
            document.querySelectorAll('#department .btn-primary').forEach((n) => n.classList.remove('btn-primary'));
            node.classList.add('btn', 'btn-primary', 'mb-3');
            document.querySelectorAll('#subject .btn').forEach((item) => {
                subjectSel.removeChild(item);
            });
            subjectSel.querySelectorAll('br').forEach((item) => {
                subjectSel.removeChild(item);
            });
            obj[node.textContent].forEach((item) => {
                const childNode = document.createElement('button');
                const childTextNode = document.createTextNode(item);
                const br = document.createElement('br');
                childNode.appendChild(childTextNode);
                subjectSel.appendChild(childNode);
                subjectSel.appendChild(br);
                childNode.classList.add('btn', 'mb-3');
                childNode.onclick = function () {
                    document
                        .querySelectorAll('#subject .btn-primary')
                        .forEach((n) => n.classList.remove('btn-primary'));
                    childNode.classList.add('btn', 'btn-primary', 'mb-3');
                };
            });
        };
    }
};
function getSubject() {
    document.querySelectorAll('#subject .btn-primary').forEach((item) => {
        subArr.push(item.innerHTML);
    });
}
function getAllSubject() {
    document.querySelectorAll('#subject .btn').forEach((item) => {
        subArr.push(item.innerHTML);
    });
}
function showSubject() {
    const uniqueSub = new Set(subArr);
    const backToSubArray = [...uniqueSub];
    document.querySelectorAll('#selected .row').forEach((item) => selectedSel.removeChild(item));
    for (var sub in backToSubArray) {
        selectedSel.innerHTML +=
            ' <div class="row mb-1"><div class="col-lg-10 col-sm-10">' +
            '<input value="' +
            backToSubArray[sub] +
            '" style="width:100%" disabled/></div>' +
            '<div class="col-lg-2 col-sm-2"><button class="btn btn-primary" onclick="deleteObj(this)">' +
            '<i class="fa-solid fa-xmark"></i></button>' +
            '</div></div>';
    }
}
function handleShow1Object() {
    getSubject();
    showSubject();
}
function handleShowManyObject() {
    getAllSubject();
    showSubject();
}

function deleteObj(obj) {
    subArr.splice(subArr.indexOf(obj.parentNode.parentNode.querySelector('input').value), 1);
    obj.parentNode.parentNode.remove();
}
