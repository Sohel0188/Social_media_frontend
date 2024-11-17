
function timeAgo(created_at) {
    const createdTime = new Date(created_at); // Convert the timestamp string to a Date object
    const currentTime = new Date(); // Get the current time

    const differenceInSeconds = Math.floor((currentTime - createdTime) / 1000); // Difference in seconds

    // Calculate the time difference in human-readable format
    let interval = Math.floor(differenceInSeconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(differenceInSeconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(differenceInSeconds / 604800);
    if (interval >= 1) return interval + " week" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(differenceInSeconds / 86400);
    if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(differenceInSeconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(differenceInSeconds / 60);
    if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";

    return "just now"; // If less than a minute, show "just now"
}

fetch('http://127.0.0.1:8000/post/post/')
    .then(res => res.json())
    .then(data => {
        const parents = document.getElementById("all_post");
        data.forEach(post => {
            let countReact = 0;
            
            data.forEach(post => {
                
                fetch(`http://127.0.0.1:8000/post/react/?post=${post.id}`)
                .then(res => res.json())
                .then(data => {
                    // Step 1: Use a Set to collect unique reactions
                    const uniqueReactions = new Set();         

                    data.forEach(reaction => {
                        uniqueReactions.add(reaction.reaction); 
                        // console.log(reaction);
                        countReact=countReact+1;
                        
                        
                    });
                    // Step 2: Generate HTML for unique reactions only
                    const reactionsHTML = Array.from(uniqueReactions).map(reaction => {
                        return `<span>${reaction}</span>`;
                    }).join(' ');
                    console.log(countReact);
                    // Step 3: Update the DOM with the generated HTML
                    document.getElementById(`reactdata${post.id}`).innerHTML = reactionsHTML;
                    document.getElementById(`count${post.id}`).innerHTML = countReact;
                })
                
                
                .catch(error => console.error('Error:', error));
            });
            console.log(countReact);
            const div = document.createElement('div');
            div.classList.add('card', 'w-100', 'shadow-xss', 'rounded-xxl', 'border-0', 'p-4', 'mb-4');
            const timeAgoText = timeAgo(post.created_at);
            let imageSection = "";
            let videoSection = "";

            if (post.image) {
                imageSection = `
                    <div class="row ps-2 pe-2">
                        <div class="col-xs-12 col-sm-12 p-1"><a href="images/t-36.jpg"
                        data-lightbox="roadtri"><img src="${post.image}"
                        class="rounded-3 w-100" alt="image"></a></div>
                    </div>
            `
            }
            
            if (post.video) {
                videoSection = `
                <div class="card-body p-0 mb-3 rounded-3 overflow-hidden">
                   <div class="player bg-transparent shadow-none">
                            <video
                                id="my-video4" class="video-js"controls preload="auto" data-setup="{}"
                                style="width: 100%; height: auto;">
                                <source src="${post.video}" type="video/mp4"/>
                                <p class="vjs-no-js">
                                    To view this video please enable JavaScript, and consider upgrading to a
                                    web browser that
                                    <a href="${post.video}" target="_blank">supports HTML5 video</a>
                                </p>
                            </video>
                    </div>  
                </div>
            `
            }

            const midSection = post.video ? videoSection : imageSection;
            div.innerHTML = `
             <div class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                                    <div class="card-body p-0 d-flex">
                                        <figure class="avatar me-3"><img src="${post.user_image}" alt="image"
                                                class="shadow-sm rounded-circle w45"></figure>
                                        <h4 class="fw-700 text-grey-900 font-xssss mt-1">${post.user_name}<span
                                                class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">${timeAgoText}
                                                </span>
                                        </h4>
                                        <a href="#" class="ms-auto"><i
                                                class="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                    </div>

                                    <div class="card-body p-0">
                                     
                                        <p class="fw-500 text-black-500 lh-26 font-xsss">${post.description}

                                        </p>
                                   
                                    </div>
                                    <div class="card-body d-block p-0 mb-3">

                                        ${midSection}
                                       
                                    </div>
                                    <div class="card-body d-flex p-0">
                                        <a href="#"
                                            class="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
                                            
                                            <h1 id=reactdata${post.id}></h1><span id=count${post.id}></span>K
                                            Like</a>
                                        
                                        <a href="#"
                                            class="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                                class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span
                                                class="d-none-xss">22 Comment</span></a>
                                        <a href="#"
                                            class="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"> <span
                                                class="d-none-xs"></span> 20 <i
                                                class="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i></a>
                                    </div>

                                    <hr>
                                    
                                    <div class= "react_section d-flex justify-content-between">
                                       <div id="emoji-${post.id}" class="emoji-wrap">
                                            <ul class="emojis list-inline mb-0">
                                               
                                                <li class="emoji list-inline-item"  style="cursor:pointer">
                                                   <h1 id="happy" onclick="giveReact(${post.id},'happy')">&#128514;</h1>
                                                </li>
                                                <li class="emoji list-inline-item"  style="cursor:pointer">
                                                    <h1 id="sad" onclick="giveReact(${post.id},'sad')">&#128549;</h1>

                                                </li>
                                                <li class="emoji list-inline-item" style="cursor:pointer">
                                                    <h1 id="right" onclick="giveReact(${post.id},'right')">&#128077;</h1>
                                                </li>
                                            </ul>
                                        </div>
                                    
                                        <div class = "react">
                                            <span onclick="reactModal(${post.id})"
                                            style="cursor: pointer;" class="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xsss me-2">
                                            
                                            <i class="feather-thumbs-up text-dark me-1 btn-round-sm font-lg"></i> Like</span>
                                        </div>

                                        <div class = "comment">
                                            <a href="#"
                                            class="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xsss"><i
                                                class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span
                                                class="d-none-xss">Write A Comment</span></a>
                                        </div>


                                        <div class = "Share">
                                            <a href="#"
                                            class="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xsss"><i
                                                class="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                                class="d-none-xs"> Share </span></a>
                                        
                                        </div>
                                    </div>
                                </div>
                            `
            parents.appendChild(div);
            
        });
    })


const giveReact=(postid,react)=>{    
    const reactValue = document.getElementById(`${react}`).innerHTML.trim();
    const info = {
        reaction: reactValue,
        user: 1,
        post: postid,
        
      };
    //   console.log(info);
      fetch('http://127.0.0.1:8000/post/react/',{
        method:"POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(info),
      }).then((res=>res.json()))
      .then((data)=>{

        const reactDataContainer = document.getElementById(`reactdata${postid}`);
        const currentReactions = Array.from(reactDataContainer.querySelectorAll("span")).map(span => span.textContent.trim());

        // Check if the reaction already exists
        if (!currentReactions.includes(reactValue)) {
            // Append the new reaction if not already present
            const newReaction = document.createElement("span");
            newReaction.textContent = reactValue;
            reactDataContainer.appendChild(newReaction);
        }
    
    
    }
    
    
    );

      

    // console.log(postid);
    // console.log(reactValue);
    removereactModal(postid);
}
