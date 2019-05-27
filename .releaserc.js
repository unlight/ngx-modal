module.exports = {
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@semantic-release/npm",
            {
                "pkgRoot": "dist"
            }
        ],
        "@semantic-release/git"
    ]
};

if (process.env.GITLAB_CI) {
    module.exports.plugins.push("@semantic-release/gitlab");
} else {
    module.exports.plugins.push("@semantic-release/github");
}
