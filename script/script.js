function tab_close(event) {
    event.stopPropagation();
    id = event.currentTarget.parentNode.id.split("-")[1]
    var corresponding_page = document.getElementById(`page-${id}`);
    corresponding_page.style.display = "none";
    if (event.currentTarget.parentNode.classList.contains("tab-selected")) {
        deselect_all_sidebar_items();
        var header_tabs = document.getElementById("header-tabs");
        if (header_tabs.children.length > 1) {
            var newly_selected_tab = 0;
            if (header_tabs.children[0].id == event.currentTarget.parentNode.id) {
                newly_selected_tab = 1;
            }
            header_tabs.children[newly_selected_tab].classList.add("tab-selected");
            const newly_selected_tab_id = header_tabs.children[newly_selected_tab].id.split("-")[1]
            corresponding_page = document.getElementById(`page-${newly_selected_tab_id}`);
            corresponding_page.style.display = "block";

            var corresponding_sidebar_item = document.getElementById(`sidebar-${newly_selected_tab_id}`);
            corresponding_sidebar_item.classList.add("sidebar-selected");
        }
        else {
            const page_intro = document.getElementById("page-intro");
            page_intro.style.display = "flex";
            const tab_pages = document.getElementById("tab-pages");
            tab_pages.style.display = "none";
        }
    }
    event.currentTarget.parentNode.remove();
}

function deselect_all_sidebar_items() {
    var selected_sidebar_items = document.getElementsByClassName("sidebar-selected");
    for (var i = 0; i < selected_sidebar_items.length; i++) {
        selected_sidebar_items[i].classList.remove("sidebar-selected");
    }
}

function deselect_all_tabs() {
    var selectedtabs = document.getElementsByClassName("tab-selected");
    for (var i = 0; i < selectedtabs.length; i++) {
        selectedtabs[i].classList.remove("tab-selected");
    }
}

function hide_all_pages() {
    var pages = document.getElementsByClassName("page");
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
}

const id_to_text = {
    "about": "About.py",
    "skills": "Skills.py",
    "research": "Research.py",
    "engineering": "Engineering.py",
    "imgtostory": "ImageToStory.py",
    "youtube": "YouTubeChannel.py",
    "more": "More.py",
    "contact": "Contact.py",
}

var elements_initial_height = {}

document.addEventListener("DOMContentLoaded", () => {
    console.log("YouTube ☝️.\nMe:");
    console.log(`⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
⣿⣿⣿⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿⣿
⣿⣿⣿⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿`);


    const page_intro = document.getElementById("page-intro");
    const tab_pages = document.getElementById("tab-pages");

    var collapse = document.getElementsByClassName("collapse");
    for (var i = 0; i < collapse.length; i++) {
        collapse[i].addEventListener("click", function (event) {
            this.classList.toggle("dropdown-closed");
            var content = this.parentNode.nextElementSibling;
            if (!(content.id in elements_initial_height)) {
                elements_initial_height[content.id] = content.clientHeight;
            }

            if (this.classList.contains("dropdown-closed")) {
                content.style.maxHeight = 0;
            } else {
                content.style.maxHeight = `${elements_initial_height[content.id]}px`;
            }
        });
    }

    var sidebar_items = document.getElementsByClassName("sidebar-item");
    for (var i = 0; i < sidebar_items.length; i++) {
        sidebar_items[i].addEventListener("click", function () {
            deselect_all_sidebar_items();
            deselect_all_tabs();
            hide_all_pages();
            page_intro.style.display = "none";
            tab_pages.style.display = "block";
            this.classList.add("sidebar-selected");
            const id = this.id.split("-")[1];
            var corresponding_tab = document.getElementById(`tab-${id}`);
            if (corresponding_tab) {
                corresponding_tab.classList.add("tab-selected");
            }
            else {
                var tab_template = document.getElementById("tab-template").content.cloneNode(true);
                tab_template.querySelector('li').id = `tab-${id}`;
                tab_template.querySelector('li').addEventListener("click", function () {
                    const id = this.id.split("-")[1];
                    deselect_all_tabs();
                    this.classList.add("tab-selected");

                    hide_all_pages();
                    page_intro.style.display = "none";
                    tab_pages.style.display = "block";
                    var corresponding_page = document.getElementById(`page-${id}`);
                    corresponding_page.style.display = "block";

                    deselect_all_sidebar_items();
                    var corresponding_sidebar_item = document.getElementById(`sidebar-${id}`);
                    corresponding_sidebar_item.classList.add("sidebar-selected");

                });
                tab_template.querySelector('li').addEventListener("dragstart", function (event) {
                    setTimeout(() => this.classList.add("tab-dragging"), 0);
                });
                tab_template.querySelector('li').addEventListener("dragend", function (event) {
                    this.classList.remove("tab-dragging");
                });
                tab_template.querySelector('span').textContent = id_to_text[id];

                var header_tabs = document.getElementById("header-tabs");
                header_tabs.appendChild(tab_template);
            }

            var corresponding_page = document.getElementById(`page-${id}`);
            corresponding_page.style.display = "block";
        });
    }

    const header_tabs = document.getElementById("header-tabs");
    header_tabs.addEventListener("dragover", function (event) {
        event.preventDefault();
        const dragging_tab = document.getElementsByClassName("tab-dragging")[0];
        const sibling_tabs = [...document.querySelectorAll(".tab:not(.tab-dragging)")];
        var next_sibling_tab = sibling_tabs.find(sibling => event.clientX < sibling.offsetLeft + sibling.offsetWidth / 2);
        this.insertBefore(dragging_tab, next_sibling_tab);
    });
    header_tabs.addEventListener("dragenter", e => e.preventDefault());

    const title = document.getElementById("title");
    const profile_photo = document.getElementById("profile-photo");
    title.addEventListener("mouseenter", function (event) {
        profile_photo.classList.add("title-hover");
    });
    title.addEventListener("mouseleave", function (event) {
        profile_photo.classList.remove("title-hover");
    });

    //clipboard api
    const copyBtn = document.getElementById("mail-copy-btn");

    copyBtn.addEventListener("click", () => {
        const email = copyBtn.getAttribute("data-email");
        navigator.clipboard.writeText(email).then(
            () => {
                copyBtn.classList.add("success-opacity");
                copyBtn.classList.add("success-text");
                setTimeout(() => {
                    copyBtn.classList.remove("success-opacity");
                }, 1000);
                setTimeout(() => {
                    copyBtn.classList.remove("success-text");
                }, 1500);
            },
            (err) => {
                console.error("Async: Could not copy text: ", err);
            }
        );
    });


    // const open_default_aside = document.getElementById("sidebar-youtube");
    // open_default_aside.click();

});