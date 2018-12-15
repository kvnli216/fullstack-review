import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.

    <ul>
      {props.repos.map((repo) => 
        <li> 
          <span>#Forks: {repo.forks_count} - </span>
          <a href={repo.html_url}>{repo.repoName}</a>
        </li>
      )}
    </ul>
  </div>
)

export default RepoList;