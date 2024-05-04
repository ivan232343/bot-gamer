const { get } = require("../../../modules/conectbd");

module.exports = {
    data: {
        name: 'asesor'
    },
    async execute(interaction) {
        // console.log(interaction);

        // console.log(getValidatePrevius)
        const dni = interaction.fields.getTextInputValue("dnicliente")
        const validateNumber = parseInt(interaction.fields.getTextInputValue("dnicliente"), 10);
        const ifExists = await get(`CALL sp_get_discordid_doc(${interaction.user.id})`)
            .then(res => res.resultados[0])
            .catch(res => "error")
        console.log(ifExists)
        if (!Number.isNaN(validateNumber)) {
            const query = `CALL \`sp_validate_gamer\`('${dni}')`;
            const getValidateGamer = await get(query).then(res => res.resultados[0]);
            console.log(getValidateGamer)
            const roles = {
                noValidationRole: interaction.member.guild.roles.cache.find((r) => r.name === "Asesor sin validar"),
                asesorWinRole: interaction.member.guild.roles.cache.find((r) => r.name === "Asesor gamer")
            }
            Object.getOwnPropertyNames(roles).forEach(async ele => {
                await interaction.member.roles.remove(roles[ele]).then(() => {
                    console.log(`Se ha quitado el rol "${roles[ele].name}" a ${interaction.member.user.tag}.`);
                }).catch((error) => {
                    console.error("Error al quitar el rol:", error);
                });
            })
            if (getValidateGamer.length !== 0) {
                setTimeout(async () => {
                    await interaction.member.roles.add(roles.gamerWinRole)
                        .then(() => {
                            console.log(`Se ha agregado el rol "${roles.gamerWinRole.name}" a ${interaction.member.user.tag}.`);
                        })
                        .catch((error) => {
                            console.error("Error al quitar el rol:", error);
                        });
                }, 5000)
                await interaction.reply({
                    content: `Genial <@${interaction.user.id}>, Se pudo validar correctamente que usted es cliente gamer,\nEn instantes se le asignara el rol "Gamer Win" y asi disfrutar del servidor.`,
                    ephemeral: true
                })
            } else {
                setTimeout(async () => {
                    await interaction.member.roles.add(roles.regularRole)
                        .then(() => {
                            console.log(`Se ha agregado el rol "${roles.regularRole.name}" a ${interaction.member.user.tag}.`);
                        })
                        .catch((error) => {
                            console.error("Error al quitar el rol:", error);
                        });
                }, 5000)
                await interaction.reply({
                    content: `Ups <@${interaction.user.id}>, Se valida que no es cliente gamer pero aun asi puede disfrutar del servidor pero tendra limites de acceso.\nSi crees que se trata de un error no dude en contactarse con Atencion al cliente para resolver el inconveniente\nGracias por su atencion.`,
                    ephemeral: true
                })
            };
            console.log(ifExists.length, dni)
            const register = ifExists.length === 0 ? `CALL \`sp_register_idxdoc\`('${interaction.user.id}','${dni}')` : `CALL \`sp_update_discordID_doc\`('${interaction.user.id}','${dni}')`;
            console.log(register)
            get(register)
                .then(res => console.log("guardado exitosamente", res))
                .catch(res => console.log("ocurrio un error:", res))
        } else {
            await interaction.reply({ content: "Tipo de dato invalido, pofavor intentelo nuevamente con numeros", ephemeral: true })
                .then(msg => { setTimeout(() => { msg.delete() }, 2500) })
        }
    }

}