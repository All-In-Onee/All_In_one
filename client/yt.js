$(document).ready(function () {
  var $pagination = $("#pagination"),
    totalRecords = 0,
    records = [],
    recPerPage = 0,
    nextPageToken = "",
    totalPages = 0;
  var API_KEY = "";
  var search = "";
  var maxResults = 10;

  $("#myForm").submit(function (e) {
    e.preventDefault();

    search = $("#search").val();

    API_KEY = "AIzaSyDz4nTdf-hY6uQZ-Hi_ah762upvqDmmnUI";

    var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}
          &part=snippet&q=${search}&maxResults=${maxResults}&type=video`;

    $.ajax({
      method: "GET",
      url: url,
      beforeSend: function () {
        $("#btn").attr("disabled", true);
        $("#results").empty();
      },
      success: function (data) {
        $("#btn").attr("disabled", false);
        displayVideos(data);
      },
    });
  });

  function apply_pagination() {
    $pagination.twbsPagination({
      totalPages: totalPages,
      visiblePages: 6,
      onPageClick: function (event, page) {
        displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
        endRec = displayRecordsIndex + recPerPage;
        displayRecords = records.slice(displayRecordsIndex, endRec);
        generateRecords(recPerPage, nextPageToken);
      },
    });
  }

  $("#search").change(function () {
    search = $("#search").val();
  });

  function generateRecords(recPerPage, nextPageToken) {
    var url2 = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}
      &part=snippet&q=${search}&maxResults=${maxResults}&pageToken=${nextPageToken}&type=video`;

    $.ajax({
      method: "GET",
      url: url2,
      beforeSend: function () {
        $("#btn").attr("disabled", true);
        $("#results").empty();
      },
      success: function (data) {
        console.log(data);
        $("#btn").attr("disabled", false);
        displayVideos(data);
      },
    });
  }

  function displayVideos(data) {
    recPerPage = data.pageInfo.resultsPerPage;
    nextPageToken = data.nextPageToken;
    console.log(records);
    totalRecords = data.pageInfo.totalResults;
    totalPages = Math.ceil(totalRecords / recPerPage);
    apply_pagination();
    $("#search").val("");

    var videoData = "";

    $("#table").show();

    data.items.forEach((item) => {
      videoData = ` 
                      
                      <tr>
                      <td>

                      <audio controls>
                      <source src="https://www.youtube.com/embed/${item.id.videoId}.mp3" type="audio/mpeg">
                      </audio>
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                    </td>
                      </td>
                      <td>
                      <span style="font-size:13px"><b>Title:</b> ${item.snippet.title}</span><br>
                      <span style="font-size:13px"><b>Description:</b> ${item.snippet.description}</span><br><br>
                     
                      <h3><u>Video Link :</u><br>
                      <a  target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
                      <button  class="btn btn-primary" style="margin-top:1rem;background: rgb(24,25,25);"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-link" style="font-size: 22px;">
                      <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"></path>
                      <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"></path>
                      </svg></button>
                      </a>
  
                      <br>
                      <h3><u>Download Now :<u><br>
        
                      <button onclick="aaha('https://www.youtube.com/watch?v=${item.id.videoId}')" class="btn btn-primary" type="button" style="margin-top:1rem;background: rgb(24,24,24);"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-download" style="font-size: 22px;">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
                      </svg></button> 
                      </td>
                      <td>
                      
                      <h3><u>${item.snippet.channelTitle} :</u><br>
                      <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">
                      <button class="btn btn-primary" type="button" style="margin-top:1rem;background: rgb(24,24,24);"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-cursor-fill" style="font-size: 22px;margin: auto auto;padding-top: 0px;">
                      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
                      </svg></button>
                      </a>
                      </td>
                      </tr>
  
                      `;

      $("#results").append(videoData);
    });
  }
});

function aaha(test) {
  const serverURL = "http://localhost:8000";
  console.log(test);
  const sendButton = (
    videoURL = String(test),
    format = "video&audio",
    quality = "high"
  ) => {
    fetch(`${serverURL}/check-download?URL=${videoURL}`)
      .then((response) => response.json())
      .then((resData) => {
        const data = JSON.parse(JSON.stringify(resData));
        if (data.status === true) {
          window.location.href = `${serverURL}/download?URL=${videoURL}&downloadFormat=${format}&quality=${quality}&title=${data.title}`;
        }
      });
  };
  sendButton();
}
