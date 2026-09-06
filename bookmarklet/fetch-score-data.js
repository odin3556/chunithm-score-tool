/**
 * chunisupport.net の API からスコアデータを取得し、
 * chunithm-rank-checker (index.html) が読み込める形式のJSONとして
 * ダウンロードするブックマークレットの元ソースです。
 *
 * 使い方: bookmarklet/README.md を参照してください。
 *
 * API: https://docs.chunisupport.net/api/#get-v1usersusernamerating
 */
(async () => {
  try {
    const username = prompt("ユーザーネームを入力してください:");
    if (!username) return;

    const token = prompt("APIトークンを入力してください:");
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    const [profileRes, ratingRes] = await Promise.all([
      fetch(`https://api.chunisupport.net/v1/users/${username}`, { headers }),
      fetch(`https://api.chunisupport.net/v1/users/${username}/rating`, { headers }),
    ]);

    if (!profileRes.ok || !ratingRes.ok) {
      throw new Error("通信エラー");
    }

    const profileData = await profileRes.json();
    const ratingData = await ratingRes.json();

    // API は difficulty をフルネーム("MASTER"等)で返すが、
    // ツールは 3 文字表記("MAS"等)を期待するので変換する
    const DIFF_MAP = {
      BASIC: "BAS", ADVANCED: "ADV", EXPERT: "EXP",
      MASTER: "MAS", ULTIMA: "ULT", WORLDSEND: "WE",
    };

    const toSong = (r) => ({
      title: r.title || r.song_title || "Unknown",
      diff: DIFF_MAP[r.difficulty] || r.difficulty || r.diff || "",
      lv: r.level || r.lv || "",
      score: r.score || 0,
      rank: r.rank || "",
      const: r.const ?? r.constant ?? null,
      rate: r.rating ?? r.rate ?? 0,
    });

    // プレイヤー名は /v1/users/:username の player.name に入っている
    const player = profileData.player || {};

    const result = {
      "プロフィール": {
        "プレイヤーネーム":
          player.name ||
          profileData.name ||
          profileData.username ||
          username,

        "レーティング":
          (player.rating || ratingData.rating || 0).toFixed(2),
      },

      "RATING_RAW":
        ratingData.rating ||
        player.rating ||
        0,

      "ベスト枠":
        (
          ratingData.best ||
          profileData.records?.best ||
          profileData.best ||
          profileData.best_records ||
          []
        ).map(toSong),

      "新曲枠":
        (
          ratingData.new ||
          profileData.records?.new ||
          profileData.new ||
          profileData.new_records ||
          []
        ).map(toSong),

      // ★ 修正：rating API の best_candidate を最優先
      "候補枠(ベスト)":
        (
          ratingData.best_candidate ||
          profileData.records?.best_candidate ||
          profileData.best_candidate ||
          []
        ).map(toSong),

      // ★ 修正：rating API の new_candidate を最優先
      "候補枠(新曲)":
        (
          ratingData.new_candidate ||
          profileData.records?.new_candidate ||
          profileData.new_candidate ||
          []
        ).map(toSong),
    };

    const blob = new Blob(
      [JSON.stringify(result, null, 1)],
      { type: "application/json" }
    );

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chunithm_player_data.json";
    a.click();

    alert("JSONファイルの出力が完了しました！");
  } catch (e) {
    alert("エラー:" + e.message);
  }
})();