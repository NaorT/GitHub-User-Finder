$(document).ready(function() {
  $('#searchUser').on('keyup', function(e) {
    var userName = e.target.value;

    // make a request to github.

    $.ajax({
      url: 'https://api.github.com/users/' + userName,
      data: {
        client_id: '70c6a8b8b80e64043a95',
        client_secret: '22bc3be3ff936cee15d335123e9f7eb075156972'
      }




    }).done(function(user) {
      $.ajax({
        url: 'https://api.github.com/users/' + userName + '/repos',
        data: {
          client_id: '70c6a8b8b80e64043a95',
          client_secret: '22bc3be3ff936cee15d335123e9f7eb075156972',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $('#repos').append(`

              <div class="row well">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-danger">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo Page</a>
                </div>
              </div>

            `);
        });

      });
      $('#profile').html(`
        <div class="card">
            <div class="card-header">
              ${user.name}
            </div>
            <div class="card-body">
            <div class="row">
              <div class="col-md-3">
              <img class="thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-danger">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-primary">Following: ${user.following}</span>
              <br>
              <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
            </div>
          </div>

          <h3 class="repos-header">Latest Repos:</h3>
          <div class="container">
          <div id="repos">
          </div>
          </div>


        `);
    });
  });
});
