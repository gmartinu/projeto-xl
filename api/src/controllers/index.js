const { response } = require("express");
const { Push, User } = require("../models");

module.exports = {
  async pushesIndex(req, res) {
    const { name, email, deviceId } = req.query;
    const [user, created] = await User.findOrCreate({
      where: { deviceId: deviceId },
      defaults: {
        name: name,
        email: email,
        deviceId: deviceId,
      },
    });
    if (created) return res.status(200).json([]);
    const pendentes = await Push.findAll({
      where: {
        TargetId: deviceId,
        pendente: false,
        confirma: false,
      },
    });
    const aguardando = await Push.findAll({
      where: {
        DeviceId: deviceId,
        pendente: true,
        confirma: false,
      },
    });
    const confirmados = await Push.findAll({
      where: {
        DeviceId: deviceId,
        pendente: false,
        confirma: true,
      },
    });
    return res.status(200).json([...aguardando, ...pendentes, ...confirmados]);
  },
  async pushesCreate(req, res) {
    const { deviceId, targetId } = req.body;
    const { id } = req.params;
    if (id) {
      const push = await Push.findByPk(id);
      if (push.pendente) {
        await Push.update(
          { confirma: true, pendente: false },
          {
            where: {
              id: id,
            },
          }
        );
      } else {
        if (push.confirma) {
          await Push.update(
            { confirma: true, pendente: true },
            {
              where: {
                id: id,
              },
            }
          );
        } else {
          await Push.update(
            { confirma: true },
            {
              where: {
                id: id,
              },
            }
          );
        }
      }
      return res.sendStatus(200);
    }
    const push = await Push.create({
      pendente: false,
      DeviceId: deviceId,
      TargetId: targetId,
      confirma: false,
    });
    if (push) return res.sendStatus(200);
    else return res.sendStatus(400);
  },
  async users(req, res) {
    const all = await User.findAll();
    if (all) return res.status(200).json(all);
    else return res.sendStatus(400);
  },
};
