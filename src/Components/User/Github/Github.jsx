import { useLoaderData } from "react-router-dom";

export default function Github() {
  const data = useLoaderData();
  const { user, followers, error } = data;

  if (error) {
    return (
      <div className="text-center text-red-500 p-10">
        Error loading GitHub data: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500 p-10">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">GitHub User Viewer</h1>

        <div className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <div className="text-lg font-medium">{user.name || user.login}</div>
            <div className="text-sm text-gray-600">@{user.login}</div>
            {user.bio && <div className="text-sm mt-1">{user.bio}</div>}
            <div className="text-sm text-gray-700 mt-2">
              Followers: <b>{user.followers}</b> • Public repos:{" "}
              <b>{user.public_repos}</b>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 text-sm text-sky-600 underline"
            >
              Open on GitHub
            </a>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">
            Followers ({followers.length})
          </h2>
          <div className="grid grid-cols-6 gap-3">
            {followers.map((f) => (
              <a
                key={f.id}
                href={f.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center text-center"
              >
                <img
                  src={f.avatar_url}
                  alt={f.login}
                  className="w-12 h-12 rounded-full mb-1"
                />
                <div className="text-xs truncate max-w-[70px]">{f.login}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export const githubloader = async () => {
    try {
      // Fetch user data
      const resUser = await fetch(`https://api.github.com/users/khadijaali12`);
      if (!resUser.ok) throw new Error("User not found");
      const user = await resUser.json();
  
      // Fetch followers
      const resFollowers = await fetch(`${user.followers_url}?per_page=50`);
      const followers = resFollowers.ok ? await resFollowers.json() : [];
  
      // Return both together
      return { user, followers };
    } catch (error) {
      return { error: error.message };
    }
  };
  