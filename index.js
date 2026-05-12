const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const command = new SlashCommandBuilder()
  .setName("pedroexe")
  .setDescription("Pedro.exe meme translator")
  .addStringOption(option =>
    option.setName("text")
      .setDescription("Input text")
      .setRequired(true)
  );

const rest = new REST({ version: "10" }).setToken(TOKEN);

function pedro(text) {
  const t = text.toLowerCase();

  if (t.includes("come")) return `pedro.exe:me want you come | ${text}`;

  if (t === "hey" || t === "hi" || t === "hello") {
    return `pedro.exe:HI 😈😈😈😈😈 | ${text}`;
  }

  if (t.includes("bruh")) return `pedro.exe: wat ever 😒😒😒😒 | ${text}`;

  if (t.includes("1v1") || t.includes("fight")) return `pedro.exe: game 1v1 😒 | ${text}`;

  if (
    t.includes("corrupt") ||
    t.includes("transform") ||
    t.includes("error") ||
    t.includes("glitch")
  ) {
    return `pedro.exe: OH NO HE IS HERE- Pedro.exe:HAHA I HERE`;
  }

  return `pedro.exe: ${text.split(" ").join("...")} ...`;
}

async function registerCommands() {
  await rest.put(
    Routes.applicationCommands(CLIENT_ID),
    { body: [command.toJSON()] }
  );
}

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await registerCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "pedroexe") {
    const text = interaction.options.getString("text");
    await interaction.reply(pedro(text));
  }
});

client.login(TOKEN);
