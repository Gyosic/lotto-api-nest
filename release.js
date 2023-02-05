// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const childProcess = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('util');
const exec = util.promisify(childProcess.exec);

// eslint-disable-next-line @typescript-eslint/no-var-requires

const constants = {
  paths: {
    srcPath: path.join(__dirname, 'src'),
    distPath: path.join(__dirname, 'release'),
  },
};

async function main() {
  try {
    fs.statSync(path.join(constants.paths.distPath, '.git'));

    console.info('[릴리즈] 저장소 동기화');
    await exec(`git -C ${constants.paths.distPath} pull`);
  } catch {
    try {
      fs.statSync(constants.paths.distPath);
      fs.rmSync(constants.paths.distPath, { recursive: true, force: true });
    } catch {
      // Ignore Error
    }

    console.info('[릴리즈] 저장소 복제');
    await exec(
      `git clone https://github.com/Gyosic/lotto-release-api.git ${constants.paths.distPath}`,
    );
  }

  await exec(
    `git -C ${constants.paths.distPath} config credential.helper 'cache --timeout=3600'`,
  );

  const dirnames = fs
    .readdirSync(constants.paths.distPath)
    .filter((n) => '.git' !== n);

  for (let i = 0, ilen = dirnames.length; i < ilen; i++) {
    const dirname = path.join(constants.paths.distPath, dirnames[i]);
    if (fs.statSync(dirname).isFile()) fs.unlinkSync(dirname);
    else fs.rmSync(dirname, { recursive: true, force: true });
  }

  console.info('[릴리즈] 빌드중...');
  await exec(`nest build`);
  await exec(`cp -r dist ${constants.paths.distPath}`);

  const {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    devDependencies,
    scripts: { 'start:prod': startScript },
    ...packageJson
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require(path.join(__dirname, 'package.json'));

  const adjustedPackageJson = JSON.stringify({
    ...packageJson,
    scripts: { 'start:prod': startScript },
  });

  fs.writeFileSync(
    path.join(constants.paths.distPath, 'package.json'),
    adjustedPackageJson,
  );
  fs.writeFileSync(
    path.join(__dirname, 'package.production.json'),
    adjustedPackageJson,
  );

  await exec(`git -C ${constants.paths.distPath} config user.name 'Gyosic'`);
  await exec(
    `git -C ${constants.paths.distPath} config user.email 'zpzptls@gmail.com'`,
  );

  await exec(`git -C ${constants.paths.distPath} add -A`);
  try {
    await exec(
      `git -C ${
        constants.paths.distPath
      } commit -m 'Release Build: ${new Date().toLocaleString()}'`,
    );
    console.info('[릴리즈] 저장소 업로드');
    await exec(`git -C ${constants.paths.distPath} push`);
  } catch (err) {
    if (err.code !== 1) throw err;
    console.info('[릴리즈] 저장소 변경내역 없음');
  }

  console.info('[릴리즈] 완료');
}

main();
