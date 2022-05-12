import bpy
import sys
import os


def main():
    argv = sys.argv
    try:
        filePath = argv[argv.index("--") + 1]
    except ValueError:
        print("invalid args")
        exit()

    # print(filePath)
    tree = bpy.context.scene.node_tree

    splitPath = filePath.split("\\")
    file = splitPath[-1]
    fileName = file.split(".")[0]
    dir = "\\".join(splitPath[:-1]) + "\\"

    print(splitPath, file, dir)

    bpy.ops.image.open(filepath=filePath, directory=dir)

    inputPlate = tree.nodes.get('plateImage')
    inputPlate.image = bpy.data.images[file]

    print(inputPlate.image)

    dir_path = os.path.dirname(os.path.realpath(__file__))

    bpyscene = bpy.context.scene

    bpyscene.render.filepath = dir_path + '/output/' + fileName + '.mp4'

    bpy.ops.render.render(animation=True)


if __name__ == '__main__':
    main()
