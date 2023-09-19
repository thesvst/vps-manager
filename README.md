# What is it used for?

This tool streamlines the process of connecting to multiple remote servers. With this simple app, there's no need to remember server IPs or their associated user accounts. Simply configure the list of remotes you use, and then access them with a single command.

# How to Configure

1. **Create a `.env` file.** 
   Use the `.env.default` file as a reference for what you need to configure. There are three primary configurations:
   - Display names of your remotes.
   - IPs of your remotes.
   - Users associated with specific machines.

2. **Names**: 
   Define the `VPS_NAMES` variable and list the display names, separated by commas.

3. **IPs**: 
   For each VPS name, define a variable in the format `PREFIX_IP`, where "PREFIX" corresponds to the VPS name you provided in `VPS_NAMES`.

4. **Users**: 
   For each VPS name, define a variable in the format `PREFIX_USERS`. Here, "PREFIX" corresponds to the VPS name from `VPS_NAMES`, and the users should be listed and separated by commas.

# How to use
Link the project by command
```
npm link
```

You can use it globally by running.
```
vps
```