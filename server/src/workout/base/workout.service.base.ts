/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "nestjs-prisma";
import { Prisma, Workout, ExerciseLog, TrainingPlan } from "@prisma/client";

export class WorkoutServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.WorkoutFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkoutFindManyArgs>
  ): Promise<number> {
    return this.prisma.workout.count(args);
  }

  async findMany<T extends Prisma.WorkoutFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkoutFindManyArgs>
  ): Promise<Workout[]> {
    return this.prisma.workout.findMany(args);
  }
  async findOne<T extends Prisma.WorkoutFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkoutFindUniqueArgs>
  ): Promise<Workout | null> {
    return this.prisma.workout.findUnique(args);
  }
  async create<T extends Prisma.WorkoutCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkoutCreateArgs>
  ): Promise<Workout> {
    return this.prisma.workout.create<T>(args);
  }
  async update<T extends Prisma.WorkoutUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkoutUpdateArgs>
  ): Promise<Workout> {
    return this.prisma.workout.update<T>(args);
  }
  async delete<T extends Prisma.WorkoutDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkoutDeleteArgs>
  ): Promise<Workout> {
    return this.prisma.workout.delete(args);
  }

  async findExerciseLogs(
    parentId: string,
    args: Prisma.ExerciseLogFindManyArgs
  ): Promise<ExerciseLog[]> {
    return this.prisma.workout
      .findUnique({
        where: { id: parentId },
      })
      .exerciseLogs(args);
  }

  async getExerciseLog(parentId: string): Promise<ExerciseLog | null> {
    return this.prisma.workout
      .findUnique({
        where: { id: parentId },
      })
      .exerciseLog();
  }

  async getTrainingPlan(parentId: string): Promise<TrainingPlan | null> {
    return this.prisma.workout
      .findUnique({
        where: { id: parentId },
      })
      .trainingPlan();
  }
}
