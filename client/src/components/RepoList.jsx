import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map((repo, index) => {
        console.log(props, props.repos)
        return <a href={repo}><Repo key={index} repo={repo} /> </a>
      })}
    </div>
  </div>
)

const Repo = (props) => (
  <div>
    {props.repo}
  </div>
)
export default RepoList;
