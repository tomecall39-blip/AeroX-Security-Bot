# Slash Commands Implementation Guide

## Overview
This update adds full slash command support to AeroX-Security-Bot while maintaining backward compatibility with prefix commands.

## What's New

### 1. **Slash Command Handler** (`src/utils/slashCommandHandler.js`)
- Automatically converts all prefix commands to slash commands
- Registers commands with Discord on bot startup
- Supports both global and guild-specific command registration

### 2. **Enhanced Interaction Handler** (`src/events/interactionCreate.js`)
- Handles all slash command interactions
- Maintains cooldown system
- Converts slash interactions to message-like format for compatibility
- Supports argument parsing from slash command options

### 3. **Updated Main Entry Point** (`src/index.js`)
- Registers slash commands when bot comes online
- Maintains all existing functionality

## Features

✅ **Automatic Command Conversion** - All existing prefix commands work as slash commands
✅ **Cooldown System** - Slash commands respect the same cooldowns as prefix commands
✅ **Dual Support** - Both prefix (`!command`) and slash commands (`/command`) work simultaneously
✅ **Easy Migration** - No changes needed to existing command files
✅ **Error Handling** - Graceful error messages for failed commands

## How It Works

### Command Registration
When the bot starts, the `registerSlashCommands` function:
1. Loads all command files from `src/commands/`
2. Converts each command to Discord slash command format
3. Registers them globally with Discord

### Command Execution
When a user runs a slash command:
1. `interactionCreate` event fires
2. Command is looked up in the commands collection
3. A fake message object is created for compatibility
4. Command runs with the same logic as prefix commands
5. Response is sent back to the user

## Railway Deployment

### Prerequisites
- Railway account
- Discord bot token
- MongoDB connection string

### Deployment Steps

1. **Connect Repository**
   - Go to Railway.app
   - Create new project
   - Connect your GitHub repository
   - Select the `slash-commands` branch

2. **Set Environment Variables**
   ```
   DISCORD_TOKEN=your_bot_token_here
   MONGODB_URL=your_mongodb_connection_string
   ```

3. **Configure Procfile**
   The existing `Procfile` already points to the correct entry:
   ```
   worker: node src/index.js
   ```

4. **Deploy**
   - Railway will automatically detect and deploy the Node.js app
   - Bot will start and register all slash commands automatically

### Environment Variables Needed
```
DISCORD_TOKEN       # Your Discord bot token
MONGODB_URL         # MongoDB connection string
```

## Testing Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Bot**
   ```bash
   node src/index.js
   ```

3. **Test Commands**
   - Prefix: `!avatar @user`
   - Slash: `/avatar` (with user option)

## Command Examples

### Utility Commands (Works as slash commands)
- `/avatar` - View user avatar
- `/userinfo` - Get user information
- `/serverinfo` - Get server information
- `/stats` - View bot stats

### Moderation Commands (Works as slash commands)
- `/ban` - Ban a member
- `/kick` - Kick a member
- `/mute` - Mute a member
- `/lock` - Lock a channel
- `/purge` - Purge messages

## Adding New Commands

No special setup needed! Just create a command file with the standard format:

```javascript
module.exports = {
    name: 'commandname',
    aliases: ['alias1', 'alias2'],
    description: "Command description",
    category: 'category',
    cooldown: 3,
    run: async (client, message, args, prefix) => {
        // Your command logic
    }
};
```

The slash command handler automatically converts it!

## Troubleshooting

### Commands not showing up
- Check bot has `applications.commands` scope
- Verify bot token is correct
- Check Discord API rate limits

### Command fails to execute
- Check console logs for errors
- Verify permissions are set correctly
- Ensure DISCORD_TOKEN env variable is set

### Cooldown issues
- Clear command cooldowns in code: `commandCooldowns.clear()`
- Cooldowns are per-user per-command

## Support

For issues or questions:
1. Check the error logs in Railway dashboard
2. Verify environment variables are set
3. Ensure Discord bot permissions are correct

---

**Deployment Status**: Ready for Railway ✅
**Slash Commands**: Fully Implemented ✅
**Backward Compatibility**: Maintained ✅
