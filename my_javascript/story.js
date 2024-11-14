fetch('http://127.0.0.1:8000/post/story/')
    .then(res => res.json())
    .then(data => {
        const parents = document.getElementById('single_story');
        const storyFullImage = document.getElementById('story_full_image');
        
        data.forEach(story => {
            const div = document.createElement('div');
            div.classList.add('item','mx-1');
            div.innerHTML = `
                <div data-bs-toggle="modal" data-bs-target="#Modalstory"
                    class="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
                    style="background-image: url(${story.image}); background-size: cover; background-position: center;">
                    <div class="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                        <a href="#">
                            <figure class="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                <img src="${story.user_image}" alt="image" class="float-right p-0 bg-white rounded-circle w-100 shadow-xss">
                            </figure>
                            <div class="clearfix"></div>
                            <h4 class="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">${story.user_name}</h4>
                        </a>
                    </div>
                </div>
            `;
            parents.appendChild(div);
            
            const story_div = document.createElement('div');
            // console.log(story_div);
            story_div.classList.add('item','d-flex');
            story_div.innerHTML=`
                <img src="${story.image}" alt="image" width='500'>
            `;
            storyFullImage.appendChild(story_div);
           
        });
        $('.owl-carousel').trigger('refresh.owl.carousel');
        // Reinitialize Owl Carousel
        $(document).ready(function () {
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                items: 1, // Set according to your design
                autoplay: true,
                dots: true
            });
        });
       
    });