# AeroX Security Bot - Slash Commands Update

## 🚀 What's Changed

### New Features
- ✨ **Full Slash Command Support** - All commands now work as Discord slash commands
- 🔄 **Backward Compatible** - Prefix commands still work alongside slash commands
- ⚡ **Auto-Registration** - Slash commands register automatically on bot startup
- 🎯 **Seamless Conversion** - No changes needed to existing command files

### Files Modified
- `src/index.js` - Added slash command registration on startup
- `src/events/interactionCreate.js` - New slash command handler
- `src/utils/slashCommandHandler.js` - New utility for converting commands

### How to Deploy to Railway

#### Option 1: Using Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Set environment variables
railway variables set DISCORD_TOKEN=your_token
railway variables set MONGODB_URL=your_mongodb_url

# Deploy
railway up
```

#### Option 2: Using GitHub Integration (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Select "Deploy from GitHub"
4. Choose this repository
5. Connect and select the `slash-commands` branch
6. Add environment variables in Railway dashboard:
   - `DISCORD_TOKEN` - Your Discord bot token
   - `MONGODB_URL` - Your MongoDB connection string
7. Railway will automatically deploy and start your bot

#### Option 3: Using railway.json
The `railway.json` file is included and will auto-detect:
- Dependencies to install
- Start command
- Environment variables needed

### Bot Permissions Required
Ensure your Discord bot has these permissions:
- `applications.commands` - Register slash commands
- `bot` - General bot functionality
- Standard moderation permissions (ban, kick, mute, etc.)

### Testing After Deployment

1. **Verify Bot is Online**
   ```
   Check Railway dashboard for running status
   ```

2. **Test Slash Command**
   ```
   Type: /avatar
   The command should appear in Discord
   ```

3. **Check Logs**
   ```
   Railway Dashboard → Logs tab
   Look for "Successfully registered X slash commands"
   ```

### Environment Variables

Required:
- `DISCORD_TOKEN` - Bot token from Discord Developer Portal
- `MONGODB_URL` - MongoDB connection string (MongoDB Atlas recommended)

Optional:
- Any other variables defined in `src/config.json`

### Troubleshooting

**Commands not showing in Discord?**
- Bot must be online (check Railway logs)
- Discord API can take 1-2 minutes to sync
- Try `/` to refresh command list

**Bot crashes on startup?**
- Check `DISCORD_TOKEN` is correct
- Verify `MONGODB_URL` is accessible
- Check Railway logs for errors

**Slash commands give errors?**
- Ensure bot has proper permissions
- Check Discord permissions on roles/channels
- Review error message in bot logs

### Support & Documentation

- [Railway Docs](https://docs.railway.app)
- [Discord.js Docs](https://discord.js.org)
- [SLASH_COMMANDS_GUIDE.md](./SLASH_COMMANDS_GUIDE.md)

---

**Status**: ✅ Ready for Railway Deployment
**Branch**: `slash-commands`
**Compatibility**: Discord.js v14+, Node.js 16+
